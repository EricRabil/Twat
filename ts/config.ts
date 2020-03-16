import fs from 'fs-extra';
import path from 'path';
import { Params } from 'twit';

export const CONFIG_PATH = path.join(__dirname, '..', 'twat.config.json');

interface Configuration {
  twitter: {
    consumer_key: string;
    consumer_secret: string;
    access_token: string;
    access_token_secret: string;
  };
  params: Params;
  reply: string;
}

const localConfig: Configuration = fs.pathExistsSync(CONFIG_PATH) ? require(CONFIG_PATH) : {};

interface Schema {
  [key: string]: string | string[] | Schema;
}

/**
 * Takes the shortcode for types and returns a default value
 * @param declaration shortcode
 */
function generateFromSoftTypeDeclaration(declaration: "s" | "o" | "b" = "o") {
  switch (declaration) {
    case "s":
      return "";
    case "o":
      return {};
    case "b":
      return false;
    default:
      return null;
  }
}

/**
 * Recursive function that assembles a configuration object given the schema
 * @param schema configuration schema
 * @param data base object - used by the recursion logic, please dont pass things here unless you know what you're doing
 */
function generateFromSchema(schema: Schema, data: any = localConfig) {
  const model: any = {};
  for (let [key, value] of Object.entries(schema)) {
    const typeDeclare = key.split('%')[1];
    if (typeDeclare) key = key.split('%')[0];
    const section: any = (key in data) ? data[key] : generateFromSoftTypeDeclaration(typeDeclare as any);
    if (Array.isArray(value)) {
      // object with no more schmeas
      const subModel: any = {};
      value.forEach((property) => {
        const value = section[property];
        subModel[property] = (typeof value === "undefined") ? null : value;
      });
      model[key] = subModel;
    } else if (typeof value === "string") {
      // single property
      model[key] = (typeof section === "undefined") ? null : section;
    } else {
      // nested schema, recurse
      model[key] = generateFromSchema(value, data[key]);
    }
  }
  return model;
}

export const Configuration: Configuration = generateFromSchema({
  twitter: ['consumer_key', 'consumer_secret', 'access_token', 'access_token_secret'],
  params: ['follow'],
  ['reply%s']: 'reply'
});

fs.writeJSONSync(CONFIG_PATH, Configuration, { spaces: 4 });
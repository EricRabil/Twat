import chalk from "chalk";
import twit from "twit";
import path from "path";
import winston from "winston";
import { Configuration, CONFIG_PATH } from "./config";

/**
 * Hello this is Twat
 * 
 * Twat will reply whatever tweet you give it
 */
class Application {
  client: twit;
  stream: twit.Stream;
  logger: winston.Logger;

  constructor() {
    this.validateConfig();
    this.client = new twit(Configuration.twitter);
    this.stream = this.client.stream("statuses/filter", Configuration.params);
    this.logger = winston.createLogger({
      level: 'debug',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.simple(),
            winston.format.colorize()
          )
        }),
        new winston.transports.File({
          format: winston.format.json(),
          filename: path.join(__dirname, "..", "twat.log")
        })
      ]
    });
    
    this.stream.on('tweet', (tweet: twit.Twitter.Status) => {
      if (!this.shouldReplyToTweet(tweet.user.id_str)) return;

      const signature = `tweet id ${tweet.id} on user @${tweet.user.screen_name} (${tweet.user.id})`;
      this.logger.debug(`initiating reply flow to ${signature}`);
      
      this.client.post('statuses/update', {
        status: Configuration.reply,
        in_reply_to_status_id: tweet.id_str
      }, (err, result, res) => {
        if (err) {
          this.logger.error(`couldn't reply to ${signature}`, err);
          return;
        }

        this.logger.info(`replied to ${signature} with content "${Configuration.reply}"`);
      });
    });

    this.logger.info('im ready to roll');
  }

  shouldReplyToTweet(author: string) {
    return (Configuration.params.follow as string[]).includes(author);
  }

  validateConfig() {
    for (const value of Object.values(Configuration.twitter)) {
      if (!value) {
        throw new Error(`You must configure your twitter credentials before running the program. The config file is stored at:\n${chalk.blue(CONFIG_PATH)}`);
      }
    }
  }
}

new Application();
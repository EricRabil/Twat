# Twat
---
### Commissioned by JustinAlexP

Hello, this is Twat, which runs on Twit, for Twitter.

This is a small program that will reply to a configured list of twitter users with a set string.

## Setting up

1. [https://twitter.com/i/flow/signup](Make a Twitter account) for the bot.
2. [https://developer.twitter.com/en/apps](Create a Twitter application) for the bot.
3. Under the newly created app page, go to the `Keys and tokens` tab, then copy over the `API key`, `API secret key`, `Access token`, and `Access token secret`. These will go into their respective fields in your configuration file.
4. [http://gettwitterid.com/](Get the twitter IDs) of the users you will be replying to
5. Pick your reply
6. Fill out the configuration file
7. Run the following commands

```zsh
fatbitch@FatBitch-Mac Twat % npm i
fatbitch@FatBitch-Mac Twat % npm run build
fatbitch@FatBitch-Mac Twat % npm run start:prod
```

If all goes well, you should see
```
info: im ready to roll
```

Now, just wait for the users you chose to follow to tweet and watch the replies roll out.

## Example configuration file
```json
{
    "twitter": {
        "consumer_key": "your ugly api key here",
        "consumer_secret": "your ugly api secret key there",
        "access_token": "your ugly access token here",
        "access_token_secret": "your ugly access token secret there"
    },
    "params": {
        "follow": [
            "751519560403152896"
        ]
    },
    "reply": "Ok boomer"
}
```
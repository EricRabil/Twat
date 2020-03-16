# Twat
#### Commissioned by [JustinAlexP](https://twitter.com/JustinAlexP?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor)

Hello, this is Twat, which runs on Twit, for Twitter.

This is a small program that will reply to a configured list of twitter users with a set string.

## Setting up

1. [Make a Twitter account](https://twitter.com/i/flow/signup) for the bot.
2. [Apply for a developer account](https://developer.twitter.com/en/apply-for-access) for the bot. Sorry, blame Russia.
3. [Create a Twitter application](https://developer.twitter.com/en/apps) for the bot.
4. Under the newly created app page, go to the `Keys and tokens` tab, then copy over the `API key`, `API secret key`, `Access token`, and `Access token secret`. These will go into their respective fields in your configuration file.
5. [Get the twitter IDs](http://gettwitterid.com/) of the users you will be replying to
6. Pick your reply
7. Fill out the configuration file
8. Run the following commands

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
            "ugly bitch token here"
        ]
    },
    "reply": "Ok boomer"
}
```
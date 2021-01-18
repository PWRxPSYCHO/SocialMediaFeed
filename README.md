# SocialMediaFeed

Uses Twitter API to receive a stream of tweets from a filtered criteria and posts them to Discord as an embedded message.

# Future
Add YouTube API handling to get latest video posts


# Setup
1. Clone the repository
2. Create a .env file in the root directory and add the following:
```
BEARER_TOKEN=
DISCORD_TOKEN=
WEBHOOK_URL=
USERNAME=
```
3. Download the Twitter API v2 Postman environment. Populate the environment variables with your `bearer_token`, `access_token`, `token_secret`.
4. Setup the **Add Rules** for the FilteredStream
`https://api.twitter.com/2/tweets/search/stream/rules`
```json
{
    "add": [
        {
            "value": "from:USERNAME",
            "tag": ""
        }
    ]
}
```
**REPLACE USERNAME WITH YOUR TWITTER USERNAME**

## BEARER TOKEN
You will have to create a [Twitter Developer Account](https://developer.twitter.com/en) and create an application on your account.
Once you have an application copy the `BEARER_TOKEN` and paste it in the .env file.

## Discord Token
You will need to create a [bot application](https://discord.com/developers/applications) OR you can run this as a standalone Node.JS application. (You will have to modify the code)

Once you create the application and create a bot, copy the `token` and paste it in the .env file.

## WEBHOOK URL
On your Discord server. Click the settings icon next to a text channel you want to add the webhook to, click `integrations`, `webhooks`, *new webhooks*. Then copy the webhook url and paste it in the .env file


## USERNAME
Add your twitter username to the .env file (Case sensitive).

# Run the Bot
Luckily Discord automatically formats Tweets as embedded messages in a nice and fancy layout so all we need to do is get the url of the tweet we want to post.

`https://twitter.com/<username>/status/<tweetId>`

<Username>: is provided in .env
<tweetId>: is returned through the filteredstream

Compile the typescript by running `tsc`
Then start it up with `npm run start`

Test it out on your twitter!





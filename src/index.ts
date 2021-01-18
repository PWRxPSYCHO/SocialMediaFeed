import { Client } from "discord.js";
import needle from "needle";
import { TwitterResponse } from "./models/twitter-response";
import * as dotenv from 'dotenv';

const client = new Client();
const streamURL = 'https://api.twitter.com/2/tweets/search/stream';
dotenv.config();

function streamConnect() {
    const stream = needle.get(streamURL, {
        headers: {
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        },
        timeout: 20000
    });

    stream.on('data', data => {
        console.log(data);
        try {
            const json = JSON.parse(data);
            console.log(json);
            twitterEmbed(json as TwitterResponse);
        } catch (error) {
            // Keep alive signal received. Do Nothing
        }
    }).on('error', error => {
        if (error.code === 'ETIMEDOUT') {
            stream.emit('timeout');
        }
    });
    return stream;
}

client.on('ready', async () => {
    const sampledStream = streamConnect();
    sampledStream.on('timeout', timeout => {
        console.warn('A connection error occured. Reconnecting...');
        setTimeout(() => {
            timeout++;
            streamConnect();
        }, 2 ** timeout);
        streamConnect()
    });
});


async function twitterEmbed(response: TwitterResponse) {
    if (response) {
        const tweetUrl = `https://twitter.com/${process.env.USERNAME}/status/${response.data.id}`
        const webhookURl = process.env.WEBHOOK_URL as string;
        const body = {
            "content": tweetUrl,
        }
        needle.post(webhookURl, body);
    }
}


if (process.env.DISCORD_TOKEN) {
    client.login(process.env.DISCORD_TOKEN);
} else {
    console.log(`Create a file called .env and put your bot's token in there.`);
    process.exit(1);
}
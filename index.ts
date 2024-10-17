//creating a bluesky bot integrated with twitter using typescript
import { BskyAgent } from '@atproto/api';
import * as dotenv from 'dotenv';
import { CronJob } from 'cron';
import * as process from 'process';
import { getTweets, KEYWORD, USERS, userTweets } from './utils';

dotenv.config();

// Create a Bluesky Agent 
const agent = new BskyAgent({
    service: 'https://bsky.social',
})


async function main() {
    // USERS.map((user) => getTweets(user, KEYWORD))
    getTweets(USERS[0], KEYWORD)

    await agent.login({ identifier: process.env.BLUESKY_USERNAME!, password: process.env.BLUESKY_PASSWORD! })
    // await agent.post({
    //     text: "🙂"
    // });

    console.log('posts', userTweets)

    console.log("Just posted!")
}

main();


// Run this on a cron job
const scheduleExpressionMinute = '* * * * *'; // Run once every minute for testing
const scheduleExpression = '0 */3 * * *'; // Run once every three hours in prod

const job = new CronJob(scheduleExpressionMinute, main); // change to scheduleExpressionMinute for testing

job.start();
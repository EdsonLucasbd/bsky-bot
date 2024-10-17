"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTweets = exports.userTweets = exports.KEYWORD = exports.USERS = void 0;
const twitter_api_v2_1 = require("twitter-api-v2");
// Substitua com suas próprias credenciais
const client = new twitter_api_v2_1.TwitterApi(process.env.TWITTER_TOKEN ?? '');
exports.USERS = [
    'FabrizioRomano',
    'samuelluckhurst',
    'ChrisWheelerDM',
    'DiscoMirror',
    'TelegraphDucker',
    'MailSport',
    'BILD_Sport',
];
exports.KEYWORD = 'Manchester United';
exports.userTweets = {};
const getTweets = async (username, keyword) => {
    try {
        // Obter o ID da conta pelo username
        const user = await client.v2.userByUsername(username);
        const userId = user.data.id;
        const tweetFields = ['created_at', 'text'];
        // Parâmetros da busca
        const params = {
            'tweet.fields': tweetFields,
            max_results: 10,
        };
        // Buscar tweets que contenham a palavra desejada
        const tweets = await client.v2.search(`from:${username} ${keyword}`, params);
        // Exibir os tweets
        for (const tweet of tweets.data.data) {
            exports.userTweets[user.data.name] = `[${tweet.created_at}] ${tweet.text}`;
        }
    }
    catch (error) {
        console.error('Erro ao buscar tweets:', error);
    }
};
exports.getTweets = getTweets;

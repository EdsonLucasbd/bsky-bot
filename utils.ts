import { TwitterApi, type TTweetv2TweetField } from 'twitter-api-v2';

// Substitua com suas próprias credenciais
const client = new TwitterApi(process.env.TWITTER_TOKEN ?? '');

export const USERS = [
  'FabrizioRomano',
  'samuelluckhurst',
  'ChrisWheelerDM',
  'DiscoMirror',
  'TelegraphDucker',
  'MailSport',
  'BILD_Sport',
]
export const KEYWORD = 'Manchester United'
export const userTweets = {}

export const getTweets = async (username: string, keyword: string) => {
  try {
    // Obter o ID da conta pelo username
    const user = await client.v2.userByUsername(username);
    const userId = user.data.id;

    const tweetFields: TTweetv2TweetField[] = ['created_at', 'text'];

    // Parâmetros da busca
    const params = {
      'tweet.fields': tweetFields,
      max_results: 10,
    };

    // Buscar tweets que contenham a palavra desejada
    const tweets = await client.v2.search(`from:${username} ${keyword}`, params)

    // Exibir os tweets
    for (const tweet of tweets.data.data) {
      userTweets[user.data.name] = `[${tweet.created_at}] ${tweet.text}`;
    }

  } catch (error) {
    console.error('Erro ao buscar tweets:', error);
  }
};
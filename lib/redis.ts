import { Redis } from '@upstash/redis'

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// Se mancano le chiavi, esportiamo null invece di far crashare il processo
export const redis = redisUrl && redisToken 
  ? new Redis({ url: redisUrl, token: redisToken })
  : null;

if (!redis) {
  console.warn("⚠️ Configurazione Redis mancante. La Leaderboard non sarà visibile.");
}

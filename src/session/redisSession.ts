import { URL } from 'url';
import * as session from 'express-session';
import * as redis from 'redis';

const RedisStore = require('connect-redis')(session);

export class RedisSession {
  private static getRedistClient() {
    if (process.env.REDISTOGO_URL) {
      const rtg = new URL(process.env.REDISTOGO_URL);

      const redisClient = redis.createClient(Number(rtg.port), rtg.hostname);
      redisClient.auth(rtg.password);

      return redisClient;
    }

    return redis.createClient();
  }

  static getSession() {
    const redisClient = this.getRedistClient();

    return session({
      store: new RedisStore({
        client: redisClient,
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    });
  }
}

import { URL } from 'url';
import * as session from 'express-session';
import * as redis from 'redis';

const RedisStore = require('connect-redis')(session);
let redisClient;

if (process.env.REDISTOGO_URL) {
  const rtg = new URL(process.env.REDISTOGO_URL);

  redisClient = redis.createClient(Number(rtg.port), rtg.hostname);
  redisClient.auth(rtg.password);
} else {
  redisClient = redis.createClient();
}

export class RedisSession {
  static getSession() {
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

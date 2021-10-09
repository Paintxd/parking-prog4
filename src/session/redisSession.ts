import * as session from 'express-session';
import * as redis from 'redis';

const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient();

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

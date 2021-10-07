import express from 'express';
import { join } from 'path';
import routes from './routes/routes';
require('dotenv').config();

class App {
  app: express.Express;

  constructor() {
    this.app = express();
    this.configs();
    this.routes();
  }

  private configs() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(join(__dirname, '..', 'public/assets')));
    this.app.set('views', join(__dirname, '..', 'public/views'));
    this.app.set('view engine', 'ejs');
  }

  private routes() {
    this.app.use('/', routes);
  }
}

export default new App().app;

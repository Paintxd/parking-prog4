import { Router } from 'express';
import IndexController from '../controllers/index.controller';

const indexController = new IndexController();

class Routes {
  routes: Router;

  constructor() {
    this.routes = Router();
    this.index();
  }

  index() {
    this.routes.get('/', indexController.home.bind(indexController));
  }
}

export = new Routes().routes;

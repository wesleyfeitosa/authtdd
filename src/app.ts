import 'dotenv/config';
import 'reflect-metadata';
import './database';

import express from 'express';

import routes from './routes';

class AppController {
  app;

  constructor() {
    this.app = express();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }
}
export default new AppController().app;

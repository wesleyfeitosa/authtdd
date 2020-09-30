import 'dotenv/config';
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import '@shared/infra/typeorm';

import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';

class AppController {
  app;

  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
    this.handleErrors();
  }

  middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes(): void {
    this.app.use(routes);
  }

  handleErrors(): void {
    this.app.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }

        console.error(err);

        return response.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      },
    );
  }
}

export default new AppController().app;

import express, {Request, Response} from 'express';
import App from './core';
import InitController from './controllers/initController';
import SecondController from './controllers/secondController';
import LogMiddleware from './middleware/log';

const app = new App({
  controllers: [
    new InitController(),
    new SecondController()
  ],
  middleware: [
    new LogMiddleware(),
    (req: Request, res: Response, next: () => void) => {
      console.log('console.log');
      next();
    }
  ]
});

app.listen(8000, () => console.log('listening 8000'));


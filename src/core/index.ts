import express, {Application} from 'express';
import {EventEmitter} from 'events';
import Controller, {IController} from './controller';
import Middleware, {IMiddlewareCallback} from './middleware';

export default class App extends EventEmitter {
  private readonly app: Application;

  constructor(state: { controllers?: Controller[], middleware?: Array<Middleware | IMiddlewareCallback> }) {
    super();
    this.on('error', console.error);

    this.app = express();
    this.middleware(state.middleware || []);
    this.controllers(state.controllers || []);
  }

  controllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      const {baseUrl, routers} = controller.constructor as unknown as IController;
      console.log('cout: ', baseUrl, routers);
      console.log('controller: ', controller.constructor);
      this.app.use(baseUrl, routers);
    });
  }

  middleware(middleware: Array<Middleware | IMiddlewareCallback>) {
    middleware.forEach(m => {
      if (m instanceof Middleware) {
        this.app.use(m.exec);
        return;
      }
      this.app.use(m);
    });
  }

  listen(port: number, callback: () => void) {
    this.app.listen(port, callback);
  }
}


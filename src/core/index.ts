import express, { Application, Router } from 'express';
import { EventEmitter } from 'events';
import Controller, { IController } from './controller';
import Middleware, { IMiddlewareCallback } from './middleware';
import { Method } from './defineRouter';

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
      const { baseUrl, routerMap } = controller.constructor as unknown as IController;
      const routers = Router();
      for (let [url, [method, handle]] of routerMap) {
        switch (method) {
          case Method.GET: {
            routers.get(url, handle.bind(controller));
            break;
          }
          case Method.POST: {
            routers.post(url, handle.bind(controller));
            break;
          }
          case Method.ALL: {
            routers.all(url, handle.bind(controller));
            break;
          }
        }
      }
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


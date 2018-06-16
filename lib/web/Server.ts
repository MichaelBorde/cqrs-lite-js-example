import { Logger } from '@arpinum/log';
import * as express from 'express';
import { Application } from 'express';
import { createServer, Server as HttpServer } from 'http';
import * as morgan from 'morgan';

import { bootstrap, RuntimeDependencies } from '../bootstrap';
import { Configuration } from '../configuration';
import { RequestHandlers } from './handlers';
import { errorMiddleware } from './middlewares';
import { createRouter } from './router';

interface Dependencies {
  configuration: Configuration;
}

export class Server {
  private readonly server: HttpServer;
  private readonly configuration: Configuration;
  private readonly logger: Logger;

  constructor(dependencies: Dependencies) {
    this.configuration = dependencies.configuration;
    const runtime = bootstrap({ configuration: this.configuration });
    this.logger = runtime.createLogger({ fileName: __filename });
    const expressApp = this.createExpressApp(runtime);
    this.server = createServer(expressApp);
  }

  private createExpressApp(runtime: RuntimeDependencies) {
    const expressApp = express();
    expressApp.set('trust proxy', true);
    expressApp.use(express.json());
    this.configureHttpLogging(expressApp);
    this.configureRouter(expressApp, runtime);
    expressApp.use(errorMiddleware({ createLogger: runtime.createLogger }));
    return expressApp;
  }

  private configureHttpLogging(expressApp: Application) {
    if (this.configuration.httpLogEnabled) {
      expressApp.use(morgan('combined'));
    }
  }

  private configureRouter(
    expressApp: Application,
    dependencies: RuntimeDependencies
  ): void {
    const { commandBus, queryBus } = dependencies;
    const requestHandlers = new RequestHandlers({
      commandBus,
      queryBus
    });
    const router = createRouter({ requestHandlers });
    expressApp.use(router);
  }

  public start(): Promise<void> {
    return this.listen().then(() => {
      const root = `http://localhost:${this.configuration.port}`;
      this.logger.info('Server started on', root);
    });
  }

  private listen() {
    return new Promise(resolve =>
      this.server.listen(this.configuration.port, resolve)
    );
  }

  public stop(): Promise<void> {
    if (!this.server) {
      return Promise.resolve();
    }
    return this.close().then(() => this.logger.info('Server stopped'));
  }

  private close() {
    return new Promise(resolve => this.server.close(resolve));
  }
}

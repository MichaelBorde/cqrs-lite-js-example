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
  private server: HttpServer;
  private readonly configuration: Configuration;
  private logger: Logger;

  constructor(dependencies: Dependencies) {
    this.configuration = dependencies.configuration;
  }

  public start(): Promise<void> {
    const expressApp = express();
    const dependencies = bootstrap({ configuration: this.configuration });
    const { createLogger } = dependencies;
    this.logger = createLogger({ fileName: __filename });

    expressApp.set('trust proxy', true);
    expressApp.use(express.json());
    this.configureHttpLogging(expressApp);
    this.configureRouter(expressApp, dependencies);
    expressApp.use(errorMiddleware({ createLogger }));

    this.server = createServer(expressApp);
    return this.listen().then(() => {
      const root = `http://localhost:${this.configuration.port}`;
      this.logger.info('Server started on', root);
    });
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

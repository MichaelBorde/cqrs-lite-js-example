import { Logger } from '@arpinum/log';
import * as express from 'express';
import { Application } from 'express';
import { createServer, Server as HttpServer } from 'http';
import * as morgan from 'morgan';

import { bootstrap, RuntimeDependencies } from '../bootstrap';
import { Configuration } from '../configuration';
import { RequestHandlers } from './handlers';
import { createRouter } from './router';

export class Server {
  private server: HttpServer;
  private configuration: Configuration;
  private logger: Logger;

  public start(): Promise<void> {
    const expressApp = express();
    const dependencies = bootstrap();
    this.configuration = dependencies.configuration;
    this.logger = dependencies.createLogger({ fileName: __filename });

    this.configureExpress(expressApp);
    this.configureHttpLogging(expressApp);
    this.configureRouter(expressApp, dependencies);

    this.server = createServer(expressApp);
    return this.listen().then(() => {
      const root = `http://localhost:${this.configuration.port}`;
      this.logger.info('Server started on', root);
    });
  }

  private configureExpress(expressApp: Application) {
    expressApp.set('trust proxy', true);
    expressApp.use(express.json());
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

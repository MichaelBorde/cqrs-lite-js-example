"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_1 = require("http");
const morgan = require("morgan");
const bootstrap_1 = require("../bootstrap");
const handlers_1 = require("./handlers");
const router_1 = require("./router");
class Server {
    start() {
        const expressApp = express();
        const dependencies = bootstrap_1.bootstrap();
        this.configuration = dependencies.configuration;
        this.logger = dependencies.createLogger({ fileName: __filename });
        this.configureExpress(expressApp);
        this.configureHttpLogging(expressApp);
        this.configureRouter(expressApp, dependencies);
        this.server = http_1.createServer(expressApp);
        return this.listen().then(() => {
            const root = `http://localhost:${this.configuration.port}`;
            this.logger.info('Server started on', root);
        });
    }
    configureExpress(expressApp) {
        expressApp.set('trust proxy', true);
        expressApp.use(express.json());
    }
    configureHttpLogging(expressApp) {
        if (this.configuration.httpLogEnabled) {
            expressApp.use(morgan('combined'));
        }
    }
    configureRouter(expressApp, dependencies) {
        const { commandBus, queryBus } = dependencies;
        const requestHandlers = new handlers_1.RequestHandlers({
            commandBus,
            queryBus
        });
        const router = router_1.createRouter({ requestHandlers });
        expressApp.use(router);
    }
    listen() {
        return new Promise(resolve => this.server.listen(this.configuration.port, resolve));
    }
    stop() {
        if (!this.server) {
            return Promise.resolve();
        }
        return this.close().then(() => this.logger.info('Server stopped'));
    }
    close() {
        return new Promise(resolve => this.server.close(resolve));
    }
}
exports.Server = Server;

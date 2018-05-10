"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("@arpinum/log");
const messaging_1 = require("@arpinum/messaging");
const Knex = require("knex");
const configuration_1 = require("../configuration");
const commandHandlers_1 = require("./commandHandlers");
const queryHandlers_1 = require("./queryHandlers");
const repositories_1 = require("./repositories");
function bootstrap() {
    const configuration = configuration_1.loadConfiguration();
    const createLogger = createCreateLogger();
    const commandBus = createCommandBus();
    const queryBus = createQueryBus();
    const dbClient = createDbClient();
    const repositories = new repositories_1.Repositories({ dbClient });
    commandHandlers_1.registerCommandHandlers({ repositories, commandBus });
    queryHandlers_1.registerQueryHandlers({ queryBus, dbClient });
    return {
        configuration,
        createLogger,
        queryBus,
        commandBus
    };
    function createCreateLogger() {
        return (options) => log_1.createLogger(Object.assign({ logLevel: configuration.logLevel }, options));
    }
    function createCommandBus() {
        const commandBusLogger = createLogger({
            level: configuration.logLevel,
            category: 'CommandBus'
        });
        return messaging_1.createMessageBus({
            log: m => commandBusLogger.debug(m),
            exclusiveHandlers: true,
            ensureAtLeastOneHandler: true
        });
    }
    function createQueryBus() {
        const queryBusLogger = createLogger({
            level: configuration.logLevel,
            category: 'QueryBus'
        });
        return messaging_1.createMessageBus({
            log: m => queryBusLogger.debug(m),
            exclusiveHandlers: true,
            ensureAtLeastOneHandler: true
        });
    }
    function createDbClient() {
        return Knex({
            client: 'pg',
            connection: configuration.database.url
        });
    }
}
exports.bootstrap = bootstrap;

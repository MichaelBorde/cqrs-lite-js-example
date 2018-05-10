"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Knex = require("knex");
const configuration_1 = require("../configuration");
function withTestDb() {
    const context = { dbClient: null };
    beforeAll(() => {
        context.dbClient = createDbClient();
    });
    afterAll(() => new Promise(r => {
        if (context.dbClient) {
            context.dbClient.destroy(r);
        }
        else {
            r();
        }
    }));
    return context;
}
exports.withTestDb = withTestDb;
function createDbClient() {
    const configuration = configuration_1.loadConfiguration();
    return Knex({
        client: 'pg',
        connection: configuration.database.url
    });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../domain");
function registerQueryHandlers(dependencies) {
    const { dbClient, queryBus } = dependencies;
    const handlers = Object.assign({}, domain_1.articleQueryHandlers({ dbClient }));
    Object.entries(handlers).forEach(([type, handler]) => queryBus.register(type, handler));
}
exports.registerQueryHandlers = registerQueryHandlers;

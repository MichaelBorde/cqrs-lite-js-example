"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../domain");
function registerCommandHandlers(dependencies) {
    const { repositories, commandBus } = dependencies;
    const handlers = Object.assign({}, domain_1.articleCommandHandlers({
        articleRepository: repositories.articleRepository
    }));
    Object.entries(handlers).forEach(([type, handler]) => commandBus.register(type, handler));
}
exports.registerCommandHandlers = registerCommandHandlers;

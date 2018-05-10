"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = require("express-promise-router");
function createRouter(dependencies) {
    const { verbHandlers } = dependencies;
    const routing = express_promise_router_1.default();
    routing.post('/articles', verbHandlers.articlesPost);
    routing.get('/articles', verbHandlers.articlesGet);
    return routing;
}
exports.createRouter = createRouter;

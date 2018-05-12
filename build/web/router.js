"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = require("express-promise-router");
function createRouter(dependencies) {
    const { requestHandlers } = dependencies;
    const routing = express_promise_router_1.default();
    routing.post('/articles', requestHandlers.articlesPost);
    routing.get('/articles', requestHandlers.articlesGet);
    return routing;
}
exports.createRouter = createRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const articles_1 = require("./articles");
class VerbHandlers {
    constructor(dependencies) {
        const { commandBus, queryBus } = dependencies;
        this.articlesGet = articles_1.articlesGet({ queryBus });
        this.articlesPost = articles_1.articlesPost({ commandBus });
    }
}
exports.VerbHandlers = VerbHandlers;

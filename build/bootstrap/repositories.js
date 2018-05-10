"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../domain");
class Repositories {
    constructor(dependencies) {
        const { dbClient } = dependencies;
        this.articleRepository = new domain_1.DbArticleRepository({ dbClient });
    }
}
exports.Repositories = Repositories;

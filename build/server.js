"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("@arpinum/log");
const web_1 = require("./web");
const server = new web_1.Server();
server.start().catch(error => log_1.logger.error(error));

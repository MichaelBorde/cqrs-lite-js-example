"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@arpinum/config");
function loadConfiguration() {
    return config_1.loadConfiguration({
        httpLogEnabled: {
            env: 'HTTP_LOG_ENABLED',
            type: 'boolean',
            default: true
        },
        logLevel: {
            env: 'LOG_LEVEL',
            default: 'debug'
        },
        port: {
            env: 'PORT',
            type: 'integer',
            default: 8080
        },
        database: {
            url: {
                env: 'DB_URL',
                default: 'postgres://postgres@localhost:5432/blog'
            }
        }
    });
}
exports.loadConfiguration = loadConfiguration;

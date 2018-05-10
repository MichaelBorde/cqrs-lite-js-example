"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ajv = require("ajv");
function createValidator(schema) {
    return new Ajv({ allErrors: true }).compile(schema);
}
exports.createValidator = createValidator;

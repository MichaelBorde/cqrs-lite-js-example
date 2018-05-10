"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
function createResponseStub() {
    return {
        end: sinon_1.stub().returnsThis(),
        send: sinon_1.stub().returnsThis(),
        sendStatus: sinon_1.stub().returnsThis(),
        status: sinon_1.stub().returnsThis()
    };
}
exports.createResponseStub = createResponseStub;

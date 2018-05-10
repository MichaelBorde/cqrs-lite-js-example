"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = require("sinon");
function createMessageBusStub() {
    return {
        post: sinon_1.stub().resolves()
    };
}
exports.createMessageBusStub = createMessageBusStub;

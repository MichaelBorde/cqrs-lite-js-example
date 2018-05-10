import { Response } from 'express';
import { stub } from 'sinon';

export function createResponseStub(): Response {
  return ({
    end: stub().returnsThis(),
    send: stub().returnsThis(),
    sendStatus: stub().returnsThis(),
    status: stub().returnsThis()
  } as any) as Response;
}

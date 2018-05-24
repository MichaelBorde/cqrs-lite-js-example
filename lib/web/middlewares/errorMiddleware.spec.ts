import { ErrorRequestHandler, Request } from 'express';

import { MissingAggregateRootError } from '../../ddd';
import { examples, ResponseMock, SilentLogger } from '../../test';
import { errorMiddleware } from './errorMiddleware';

describe('Error middleware', () => {
  let middleware: ErrorRequestHandler;
  const request = {} as Request;
  const response = new ResponseMock();
  const next = () => {
    return;
  };

  beforeEach(() => {
    middleware = errorMiddleware({ createLogger: () => new SilentLogger() });
  });

  it('should send 400 by default', () => {
    const error = new Error('bleh');

    middleware(error, request, response, next);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledWith({ error });
  });

  it('should send 404 for MissingAggregateRootError', () => {
    const error = new MissingAggregateRootError(examples.uuid);

    middleware(error, request, response, next);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledWith({ error });
  });
});

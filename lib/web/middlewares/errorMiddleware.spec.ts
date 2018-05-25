import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import {
  MissingAggregateRootError,
  QuieriedObjectNotFoundError
} from '../../ddd';
import { examples, ResponseMock, SilentLogger } from '../../test';
import { errorMiddleware } from './errorMiddleware';

describe('Error middleware', () => {
  let middleware: ErrorRequestHandler;
  let request: Request;
  let response: Response;
  let next: NextFunction;

  beforeEach(() => {
    request = {} as Request;
    response = new ResponseMock();
    next = () => {
      return;
    };
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

  it('should send 404 for QuieriedObjectNotFoundError', () => {
    const error = new QuieriedObjectNotFoundError({ id: examples.uuid });

    middleware(error, request, response, next);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledWith({ error });
  });
});

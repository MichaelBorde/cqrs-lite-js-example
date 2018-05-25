import { Logger, LoggerOptions } from '@arpinum/log';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import {
  MissingAggregateRootError,
  QuieriedObjectNotFoundError
} from '../../ddd';

interface Dependencies {
  createLogger: (options: LoggerOptions) => Logger;
}

export function errorMiddleware(
  dependencies: Dependencies
): ErrorRequestHandler {
  const logger = dependencies.createLogger({ fileName: __filename });
  return (error: Error, _1: Request, response: Response, _2: NextFunction) => {
    logger.error(error.stack || error.message);
    response.status(code()).send({ error });

    function code() {
      if (
        error instanceof MissingAggregateRootError ||
        error instanceof QuieriedObjectNotFoundError
      ) {
        return 404;
      }
      return 400;
    }
  };
}

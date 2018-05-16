import { MessageBus } from '@arpinum/messaging';
import { Handler, Request, Response } from 'express';

import { articleQueries } from '../../../domain';

interface Dependencies {
  queryBus: MessageBus;
}

export function articlesGet(dependencies: Dependencies): Handler {
  const { queryBus } = dependencies;

  return (_: Request, response: Response) => {
    return queryBus
      .post(articleQueries.getAllArticles())
      .then(articles => response.send(articles))
      .catch(error => response.status(400).send(error.message));
  };
}

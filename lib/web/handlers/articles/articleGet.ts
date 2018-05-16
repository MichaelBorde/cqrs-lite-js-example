import { MessageBus } from '@arpinum/messaging';
import { Handler, Request, Response } from 'express';

import { articleQueries } from '../../../domain';

interface Dependencies {
  queryBus: MessageBus;
}

export function articleGet(dependencies: Dependencies): Handler {
  const { queryBus } = dependencies;

  return (request: Request, response: Response) => {
    const { id } = request.params;
    return queryBus
      .post(articleQueries.getArticleById({ id }))
      .then(article => response.send(article))
      .catch(error => response.status(400).send(error.message));
  };
}

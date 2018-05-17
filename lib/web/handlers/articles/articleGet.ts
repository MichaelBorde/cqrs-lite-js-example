import { MessageBus } from '@arpinum/messaging';
import { Handler, Request, Response } from 'express';

import { articleQueries } from '../../../domain';

interface Dependencies {
  queryBus: MessageBus;
}

export function articleGet(dependencies: Dependencies): Handler {
  const { queryBus } = dependencies;

  return async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const article = await queryBus.post(
        articleQueries.getArticleById({ id })
      );
      if (article) {
        response.send(article);
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      response.status(400).send(error.message);
    }
  };
}

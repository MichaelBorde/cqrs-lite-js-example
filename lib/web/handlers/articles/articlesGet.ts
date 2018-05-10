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
      .post({
        type: articleQueries.findArticles
      })
      .then(articles => response.send(articles));
  };
}

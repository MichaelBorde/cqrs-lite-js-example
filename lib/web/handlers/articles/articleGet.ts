import { MessageBus } from '@arpinum/messaging';
import { Handler, Request, Response } from 'express';

import { articleQueries } from '../../../domain';
import { createValidator } from '../../validator';

interface Dependencies {
  queryBus: MessageBus;
}

const paramsSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' }
  },
  required: ['id'],
  additionalProperties: false
};

const validateParams = createValidator(paramsSchema);

export function articleGet(dependencies: Dependencies): Handler {
  const { queryBus } = dependencies;

  return async (request: Request, response: Response) => {
    if (!validateParams(request.params)) {
      response.status(400).send(validateParams.errors);
      return;
    }
    try {
      const payload = { id: request.params.id };
      const article = await queryBus.post(
        articleQueries.getArticleById(payload)
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

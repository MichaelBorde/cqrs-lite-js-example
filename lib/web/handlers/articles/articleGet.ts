import { MessageBus } from '@arpinum/messaging';
import { Handler, Request, Response } from 'express';

import { articleQueries } from '../../../domain';
import { createValidation } from '../../validation';

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

const validateParams = createValidation(paramsSchema);

export function articleGet(dependencies: Dependencies): Handler {
  const { queryBus } = dependencies;

  return async (request: Request, response: Response) => {
    validateParams(request.params);
    const payload = { id: request.params.id };
    const article = await queryBus.post(articleQueries.getArticleById(payload));
    response.send(article);
  };
}

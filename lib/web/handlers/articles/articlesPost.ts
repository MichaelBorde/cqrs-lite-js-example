import { MessageBus } from '@arpinum/messaging';
import { Handler, Request, Response } from 'express';

import { articleCommands } from '../../../domain';
import { createValidation } from '../../validation';

interface Dependencies {
  commandBus: MessageBus;
}

const bodySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    text: { type: 'string' }
  },
  required: ['id', 'title', 'text'],
  additionalProperties: false
};

const validateBody = createValidation(bodySchema);

export function articlesPost(dependencies: Dependencies): Handler {
  const { commandBus } = dependencies;

  return async (request: Request, response: Response) => {
    validateBody(request.body);
    await commandBus.post(articleCommands.createArticle(request.body));
    response.end();
  };
}

import { MessageBus } from '@arpinum/messaging';
import { Handler, Request, Response } from 'express';

import { articleCommands } from '../../../domain';
import { createValidation } from '../../validation';

interface Dependencies {
  commandBus: MessageBus;
}

const paramsSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' }
  },
  required: ['id'],
  additionalProperties: false
};

const bodySchema = {
  type: 'object',
  properties: {
    title: { type: 'string' }
  },
  required: ['title'],
  additionalProperties: false
};

const validateParams = createValidation(paramsSchema);
const validateBody = createValidation(bodySchema);

export function articleTitlePut(dependencies: Dependencies): Handler {
  const { commandBus } = dependencies;

  return async (request: Request, response: Response) => {
    validateParams(request.params);
    validateBody(request.body);
    const payload = { id: request.params.id, title: request.body.title };
    await commandBus.post(articleCommands.changeArticleTitle(payload));
    response.end();
  };
}

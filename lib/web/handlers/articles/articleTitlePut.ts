import { MessageBus } from '@arpinum/messaging';
import { Handler, Request, Response } from 'express';

import { articleCommands } from '../../../domain';
import { createValidator } from '../../validator';

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

const validateParams = createValidator(paramsSchema);
const validateBody = createValidator(bodySchema);

export function articleTitlePut(dependencies: Dependencies): Handler {
  const { commandBus } = dependencies;

  return async (request: Request, response: Response) => {
    if (!validateParams(request.params)) {
      response.status(400).send(validateParams.errors);
      return;
    }
    if (!validateBody(request.body)) {
      response.status(400).send(validateBody.errors);
      return;
    }
    try {
      const payload = { id: request.params.id, title: request.body.title };
      await commandBus.post(articleCommands.changeArticleTitle(payload));
      response.end();
    } catch (error) {
      response.status(400).send(error.message);
    }
  };
}

import { MessageBus } from '@arpinum/messaging';
import { Handler, Request, Response } from 'express';

import { articleCommands } from '../../../domain';
import { createValidator } from '../../validator';

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

const validateBody = createValidator(bodySchema);

export function articlesPost(dependencies: Dependencies): Handler {
  const { commandBus } = dependencies;

  return async (request: Request, response: Response) => {
    if (!validateBody(request.body)) {
      response.status(400).send(validateBody.errors);
      return;
    }
    try {
      await commandBus.post(articleCommands.createArticle(request.body));
      response.end();
    } catch (error) {
      response.status(400).send(error.message);
    }
  };
}

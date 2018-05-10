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

  return (request: Request, response: Response) => {
    if (!validateBody(request.body)) {
      return response.status(400).send(validateBody.errors);
    }
    return commandBus
      .post({
        type: articleCommands.createArticle,
        payload: request.body
      })
      .then(() => response.end());
  };
}

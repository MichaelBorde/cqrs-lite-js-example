import { MessageBus } from '@arpinum/messaging';
import { Handler, Request } from 'express';

import { articleCommands } from '../../../domain';
import { examples, MessageBusMock, ResponseMock } from '../../../test';
import { ValidationError } from '../../validation';
import { articlesPost } from './articlesPost';

describe('Articles post', () => {
  let commandBus: MessageBus;
  let handler: Handler;

  beforeEach(() => {
    commandBus = new MessageBusMock();
    handler = articlesPost({ commandBus });
  });

  it('should parse body and post a create command', async () => {
    const request = createValidRequest();
    const response = new ResponseMock();

    await handler(request, response, () => undefined);

    const expectedMessage = articleCommands.createArticle({
      id: examples.uuid,
      title: 'I have a new cat',
      text: 'Its name is Garfield'
    });
    expect(commandBus.post).toHaveBeenCalledWith(expectedMessage);
  });

  it('should end response', async () => {
    const request = createValidRequest();
    const response = new ResponseMock();

    await handler(request, response, () => undefined);

    expect(response.end).toHaveBeenCalled();
  });

  it('should throw if body is invalid', async () => {
    const request = { body: {} } as Request;
    const response = new ResponseMock();

    const handle = handler(request, response, () => undefined);

    await expect(handle).rejects.toThrow(ValidationError);
  });
});

function createValidRequest() {
  return {
    body: {
      id: examples.uuid,
      title: 'I have a new cat',
      text: 'Its name is Garfield'
    }
  } as Request;
}

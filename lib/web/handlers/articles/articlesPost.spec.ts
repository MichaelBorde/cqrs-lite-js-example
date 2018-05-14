import { MessageBus } from '@arpinum/messaging';
import { Handler, Request } from 'express';

import { articleCommands } from '../../../domain';
import { examples, MessageBusStub, ResponseStub } from '../../../test';
import { articlesPost } from './articlesPost';

describe('Articles post', () => {
  let commandBus: MessageBus;
  let handler: Handler;

  beforeEach(() => {
    commandBus = new MessageBusStub();
    handler = articlesPost({ commandBus });
  });

  it('should parse body and post a create command', async () => {
    const request = createValidRequest();
    const response = new ResponseStub();

    await handler(request, response, null);

    const expectedMessage = articleCommands.createArticle({
      id: examples.uuid,
      title: 'I have a new cat',
      text: 'Its name is Garfield'
    });
    expect(commandBus.post).toHaveBeenCalledWith(expectedMessage);
  });

  it('should end response', async () => {
    const request = createValidRequest();
    const response = new ResponseStub();

    await handler(request, response, null);

    expect(response.end).toHaveBeenCalled();
  });

  it('should send 400 if body is invalid', async () => {
    const request = { body: {} } as Request;
    const response = new ResponseStub();

    await handler(request, response, null);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalled();
    const errors = (response.send as jest.Mock).mock.calls[0][0];
    expect(errors.length).toBeGreaterThan(0);
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
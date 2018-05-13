import { MessageBus } from '@arpinum/messaging';
import { Handler, Request } from 'express';
import { SinonStub } from 'sinon';

import { articleCommands } from '../../../domain';
import {
  createMessageBusStub,
  createResponseStub,
  examples
} from '../../../test';
import { articlesPost } from './articlesPost';

describe('Articles post', () => {
  let commandBus: MessageBus;
  let handler: Handler;

  beforeEach(() => {
    commandBus = createMessageBusStub();
    handler = articlesPost({ commandBus });
  });

  it('should parse body and post a create command', async () => {
    const request = createValidRequest();
    const response = createResponseStub();

    await handler(request, response, null);

    const postStub = commandBus.post as SinonStub;
    const expectedMessage = articleCommands.createArticle({
      id: examples.uuid,
      title: 'I have a new cat',
      text: 'Its name is Garfield'
    });
    const actualMessage = postStub.lastCall.args[0];
    expect(actualMessage).toEqual(expectedMessage);
  });

  it('should end response', async () => {
    const request = createValidRequest();
    const response = createResponseStub();

    await handler(request, response, null);

    expect((response.end as SinonStub).called).toBeTruthy();
  });

  it('should send 400 if body is invalid', async () => {
    const request = { body: {} } as Request;
    const response = createResponseStub();

    await handler(request, response, null);

    const statusStub = response.status as SinonStub;
    expect(statusStub.called).toBeTruthy();
    expect(statusStub.lastCall.args[0]).toEqual(400);
    const sendStub = response.send as SinonStub;
    expect(sendStub.called).toBeTruthy();
    const errors = sendStub.lastCall.args[0] as any[];
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

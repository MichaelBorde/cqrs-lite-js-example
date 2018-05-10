import { MessageBus } from '@arpinum/messaging';
import { Handler, Request } from 'express';
import { SinonStub } from 'sinon';

import { articleQueries } from '../../../domain';
import {
  createMessageBusStub,
  createResponseStub,
  examples
} from '../../../test';
import { articlesGet } from './articlesGet';

describe('Articles get', () => {
  let queryBus: MessageBus;
  let handler: Handler;

  beforeEach(() => {
    queryBus = createMessageBusStub();
    handler = articlesGet({ queryBus });
  });

  it('should post a message to find and send articles', async () => {
    const request = createValidRequest();
    const response = createResponseStub();
    (queryBus.post as SinonStub)
      .withArgs({ type: articleQueries.findArticles })
      .resolves([
        {
          id: examples.uuid,
          title: 'Game review',
          text: 'Doom is a great game'
        }
      ]);

    await handler(request, response, null);

    const sendStub = response.send as SinonStub;
    expect(sendStub.called).toBeTruthy();
    expect(sendStub.lastCall.args[0]).toEqual([
      {
        id: examples.uuid,
        title: 'Game review',
        text: 'Doom is a great game'
      }
    ]);
  });
});

function createValidRequest() {
  return {} as Request;
}

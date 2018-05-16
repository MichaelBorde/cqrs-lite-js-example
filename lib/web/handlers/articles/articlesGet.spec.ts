import { MessageBus } from '@arpinum/messaging';
import { Handler, Request } from 'express';

import { articleQueries } from '../../../domain';
import { examples, MessageBusMock, ResponseMock } from '../../../test';
import { articlesGet } from './articlesGet';

describe('Articles get', () => {
  let queryBus: MessageBus;
  let handler: Handler;

  beforeEach(() => {
    queryBus = new MessageBusMock();
    handler = articlesGet({ queryBus });
  });

  it('should post a message to get all articles', async () => {
    const request = createValidRequest();
    const response = new ResponseMock();

    await handler(request, response, null);

    expect(queryBus.post).toHaveBeenCalledWith(articleQueries.getAllArticles());
  });

  it('should return found articles', async () => {
    const request = createValidRequest();
    const response = new ResponseMock();
    queryBus.post = jest.fn().mockImplementation(() =>
      Promise.resolve([
        {
          id: examples.uuid,
          title: 'Game review',
          text: 'Doom is a great game'
        }
      ])
    );

    await handler(request, response, null);

    expect(response.send).toHaveBeenCalledWith([
      {
        id: examples.uuid,
        title: 'Game review',
        text: 'Doom is a great game'
      }
    ]);
  });

  it('should send 400 if query fails', async () => {
    const request = createValidRequest();
    const response = new ResponseMock();
    queryBus.post = jest.fn().mockRejectedValue(new Error('Oupsie'));

    await handler(request, response, null);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledWith('Oupsie');
  });
});

function createValidRequest() {
  return {} as Request;
}

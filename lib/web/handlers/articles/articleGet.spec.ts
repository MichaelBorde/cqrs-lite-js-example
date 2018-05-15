import { MessageBus } from '@arpinum/messaging';
import { Handler, Request } from 'express';

import { articleQueries } from '../../../domain';
import { examples, MessageBusMock, ResponseMock } from '../../../test';
import { articleGet } from './articleGet';

describe('Article get', () => {
  let queryBus: MessageBus;
  let handler: Handler;

  beforeEach(() => {
    queryBus = new MessageBusMock();
    handler = articleGet({ queryBus });
  });

  it('should post a message to get article by id', async () => {
    const request = createValidRequest();
    const response = new ResponseMock();

    await handler(request, response, null);

    expect(queryBus.post).toHaveBeenCalledWith(
      articleQueries.getArticleById({ id: examples.uuid })
    );
  });

  it('should return found article', async () => {
    const request = createValidRequest();
    const response = new ResponseMock();
    (queryBus.post as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        id: examples.uuid,
        title: 'Game review',
        text: 'Doom is a great game'
      })
    );

    await handler(request, response, null);

    expect(response.send).toHaveBeenCalledWith({
      id: examples.uuid,
      title: 'Game review',
      text: 'Doom is a great game'
    });
  });
});

function createValidRequest() {
  return { params: { id: examples.uuid } } as Request;
}
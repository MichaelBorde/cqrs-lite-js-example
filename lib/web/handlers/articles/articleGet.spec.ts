import { MessageBus } from '@arpinum/messaging';
import { Handler, Request } from 'express';
import * as _ from 'lodash/fp';

import { articleQueries as queries } from '../../../domain';
import { examples, MessageBusMock, ResponseMock } from '../../../test';
import { articleGet } from './articleGet';

describe('Article get', () => {
  let queryBus: MessageBus;
  let handler: Handler;

  beforeEach(() => {
    queryBus = new MessageBusMock();
    handler = articleGet({ queryBus });
  });

  it('should post a query and send found article', async () => {
    const request = createValidRequest();
    const response = new ResponseMock();
    queryBus.post = jest.fn().mockImplementation(message => {
      if (_.isEqual(message, queries.getArticleById({ id: examples.uuid }))) {
        return Promise.resolve({
          id: examples.uuid,
          title: 'Game review',
          text: 'Doom is a great game'
        });
      }
      return Promise.resolve();
    });

    await handler(request, response, null);

    expect(response.send).toHaveBeenCalledWith({
      id: examples.uuid,
      title: 'Game review',
      text: 'Doom is a great game'
    });
  });

  it('should send 400 if params are invalid', async () => {
    const request = { ...createValidRequest(), params: {} } as Request;
    const response = new ResponseMock();

    await handler(request, response, null);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalled();
    const errors = (response.send as jest.Mock).mock.calls[0][0];
    expect(errors.length).toBeGreaterThan(0);
  });
});

function createValidRequest() {
  return { params: { id: examples.uuid } } as Request;
}

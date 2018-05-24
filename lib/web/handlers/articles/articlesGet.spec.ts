import { MessageBus } from '@arpinum/messaging';
import { Handler, Request } from 'express';
import * as _ from 'lodash/fp';

import { articleQueries as queries } from '../../../domain';
import { examples, MessageBusMock, ResponseMock } from '../../../test';
import { articlesGet } from './articlesGet';

describe('Articles get', () => {
  let queryBus: MessageBus;
  let handler: Handler;

  beforeEach(() => {
    queryBus = new MessageBusMock();
    handler = articlesGet({ queryBus });
  });

  it('should post a query and send found articles', async () => {
    const request = createValidRequest();
    const response = new ResponseMock();
    queryBus.post = jest.fn().mockImplementation(message => {
      if (_.isEqual(message, queries.getAllArticles())) {
        return Promise.resolve([
          {
            id: examples.uuid,
            title: 'Game review',
            text: 'Doom is a great game'
          }
        ]);
      }
      return Promise.resolve();
    });

    await handler(request, response, null);

    expect(response.send).toHaveBeenCalledWith([
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

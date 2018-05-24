import { MessageBus } from '@arpinum/messaging';
import { Handler, Request } from 'express';

import { articleCommands } from '../../../domain';
import { examples, MessageBusMock, ResponseMock } from '../../../test';
import { articleTitlePut } from './articleTitlePut';

describe('Article title put', () => {
  let commandBus: MessageBus;
  let handler: Handler;

  beforeEach(() => {
    commandBus = new MessageBusMock();
    handler = articleTitlePut({ commandBus });
  });

  it('should parse body and post a change title command', async () => {
    const request = createValidRequest();
    const response = new ResponseMock();

    await handler(request, response, null);

    const expectedMessage = articleCommands.changeArticleTitle({
      id: examples.uuid,
      title: 'My new title is so great'
    });
    expect(commandBus.post).toHaveBeenCalledWith(expectedMessage);
  });

  it('should end response', async () => {
    const request = createValidRequest();
    const response = new ResponseMock();

    await handler(request, response, null);

    expect(response.end).toHaveBeenCalled();
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

  it('should send 400 if body is invalid', async () => {
    const request = { ...createValidRequest(), body: {} } as Request;
    const response = new ResponseMock();

    await handler(request, response, null);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalled();
    const errors = (response.send as jest.Mock).mock.calls[0][0];
    expect(errors.length).toBeGreaterThan(0);
  });
});

function createValidRequest() {
  return {
    params: {
      id: examples.uuid
    },
    body: {
      title: 'My new title is so great'
    }
  } as Request;
}

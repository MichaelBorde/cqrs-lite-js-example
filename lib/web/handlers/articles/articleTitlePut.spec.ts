import { MessageBus } from '@arpinum/messaging';
import { Handler, Request } from 'express';

import { articleCommands } from '../../../domain';
import { examples, MessageBusMock, ResponseMock } from '../../../test';
import { ValidationError } from '../../validation';
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

    await handler(request, response, () => undefined);

    const expectedMessage = articleCommands.changeArticleTitle({
      id: examples.uuid,
      title: 'My new title is so great'
    });
    expect(commandBus.post).toHaveBeenCalledWith(expectedMessage);
  });

  it('should end response', async () => {
    const request = createValidRequest();
    const response = new ResponseMock();

    await handler(request, response, () => undefined);

    expect(response.end).toHaveBeenCalled();
  });

  it('should throw if params are invalid', async () => {
    const request = { ...createValidRequest(), params: {} } as Request;
    const response = new ResponseMock();

    const handle = handler(request, response, () => undefined);

    await expect(handle).rejects.toThrow(ValidationError);
  });

  it('should throw if body is invalid', async () => {
    const request = { ...createValidRequest(), body: {} } as Request;
    const response = new ResponseMock();

    const handle = handler(request, response, () => undefined);

    await expect(handle).rejects.toThrow(ValidationError);
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

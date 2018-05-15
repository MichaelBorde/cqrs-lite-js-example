import { MessageBus } from '@arpinum/messaging';
import { Response } from 'express';

export * from './database';
export * from './examples';

export const ResponseMock = jest.fn<Response>(() => ({
  end: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
  sendStatus: jest.fn().mockReturnThis(),
  status: jest.fn().mockReturnThis()
}));

export const MessageBusMock = jest.fn<MessageBus>(() => ({
  post: jest.fn().mockResolvedValue(undefined)
}));

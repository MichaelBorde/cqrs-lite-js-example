import { MessageBus } from '@arpinum/messaging';
import { stub } from 'sinon';

export function createMessageBusStub(): MessageBus {
  return ({
    post: stub().resolves()
  } as any) as MessageBus;
}

import { MessageBus } from '@arpinum/messaging';
import { Handler } from 'express';

import { articlesGet, articlesPost } from './articles';

interface RequestHandlersDependencies {
  commandBus: MessageBus;
  queryBus: MessageBus;
}

export class RequestHandlers {
  public articlesGet: Handler;
  public articlesPost: Handler;

  constructor(dependencies: RequestHandlersDependencies) {
    const { commandBus, queryBus } = dependencies;
    this.articlesGet = articlesGet({ queryBus });
    this.articlesPost = articlesPost({ commandBus });
  }
}

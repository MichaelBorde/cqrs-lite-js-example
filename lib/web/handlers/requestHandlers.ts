import { MessageBus } from '@arpinum/messaging';
import { Handler } from 'express';

import { articleGet, articlesGet, articlesPost } from './articles';

interface RequestHandlersDependencies {
  commandBus: MessageBus;
  queryBus: MessageBus;
}

export class RequestHandlers {
  public articleGet: Handler;
  public articlesGet: Handler;
  public articlesPost: Handler;

  constructor(dependencies: RequestHandlersDependencies) {
    const { commandBus, queryBus } = dependencies;
    this.articleGet = articleGet({ queryBus });
    this.articlesGet = articlesGet({ queryBus });
    this.articlesPost = articlesPost({ commandBus });
  }
}

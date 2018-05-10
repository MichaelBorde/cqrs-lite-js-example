import { MessageBus } from '@arpinum/messaging';
import { Handler } from 'express';

import { articlesGet, articlesPost } from './articles';

interface VerbHandlersDependencies {
  commandBus: MessageBus;
  queryBus: MessageBus;
}

export class VerbHandlers {
  public articlesGet: Handler;
  public articlesPost: Handler;

  constructor(dependencies: VerbHandlersDependencies) {
    const { commandBus, queryBus } = dependencies;
    this.articlesGet = articlesGet({ queryBus });
    this.articlesPost = articlesPost({ commandBus });
  }
}

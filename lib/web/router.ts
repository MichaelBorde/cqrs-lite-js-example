import { Router } from 'express';
import PromiseRouter from 'express-promise-router';

import { VerbHandlers } from './handlers';

interface RouterDependencies {
  verbHandlers: VerbHandlers;
}

export function createRouter(dependencies: RouterDependencies): Router {
  const { verbHandlers } = dependencies;
  const routing = PromiseRouter();
  routing.post('/articles', verbHandlers.articlesPost);
  routing.get('/articles', verbHandlers.articlesGet);
  return routing;
}

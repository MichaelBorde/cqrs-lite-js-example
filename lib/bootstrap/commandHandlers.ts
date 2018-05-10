import { MessageBus } from '@arpinum/messaging';

import { articleCommandHandlers } from '../domain';
import { Repositories } from './repositories';

interface Dependencies {
  repositories: Repositories;
  commandBus: MessageBus;
}

export function registerCommandHandlers(dependencies: Dependencies) {
  const { repositories, commandBus } = dependencies;
  const handlers = {
    ...articleCommandHandlers({
      articleRepository: repositories.articleRepository
    })
  };
  Object.entries(handlers).forEach(([type, handler]) =>
    commandBus.register(type, handler)
  );
}

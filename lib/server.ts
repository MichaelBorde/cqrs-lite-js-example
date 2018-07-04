import { createLogger, LevelName } from '@arpinum/log';
import { Server } from './web';

import { loadConfiguration } from './configuration';

const configuration = loadConfiguration();

const logger = createLogger({
  level: configuration.logLevel as LevelName,
  fileName: __filename
});

const server = new Server({ configuration });
server.start().catch(error => logger.error(error));

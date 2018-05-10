import { logger } from '@arpinum/log';
import { Server } from './web';

const server = new Server();
server.start().catch(error => logger.error(error));

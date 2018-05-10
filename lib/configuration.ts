import { loadConfiguration as load } from '@arpinum/config';

export interface Configuration {
  httpLogEnabled: boolean;
  logLevel: string;
  port: number;
  database: {
    url: string;
  };
}

export function loadConfiguration(): Configuration {
  return load({
    httpLogEnabled: {
      env: 'HTTP_LOG_ENABLED',
      type: 'boolean',
      default: true
    },
    logLevel: {
      env: 'LOG_LEVEL',
      default: 'debug'
    },
    port: {
      env: 'PORT',
      type: 'integer',
      default: 8080
    },
    database: {
      url: {
        env: 'DB_URL',
        default: 'postgres://postgres@localhost:5432/blog'
      }
    }
  });
}

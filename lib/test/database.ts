import * as Knex from 'knex';

import { loadConfiguration } from '../configuration';

export interface DbTestContext {
  dbClient: Knex;
}

export function withTestDb() {
  const context: DbTestContext = { dbClient: null };
  beforeAll(() => {
    context.dbClient = createDbClient();
  });
  afterAll(() =>
    new Promise(r => {
      if (context.dbClient) {
        context.dbClient.destroy(r);
      } else {
        r();
      }
    }));
  return context;
}

function createDbClient(): Knex {
  const configuration = loadConfiguration();
  return Knex({
    client: 'pg',
    connection: configuration.database.url
  });
}

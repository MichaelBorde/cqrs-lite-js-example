const { loadConfiguration } = require('./build/configuration');

const configuration = loadConfiguration();

const common = {
  client: 'pg',
  connection: configuration.database.url,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'migrations',
    directory: './database/migrations'
  }
};

module.exports = {
  development: common,
  staging: common,
  production: common
};

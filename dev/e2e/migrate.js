'use strict';

const knex = require('knex');
const knexConfig = require('../../knexfile');
require('./env');

const dbClient = knex(knexConfig.development);

dbClient.migrate.latest().then(() => dbClient.destroy());

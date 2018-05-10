#!/usr/bin/env bash

set -e

export DB_URL=postgres://postgres@localhost:5432/blog_tests

npm run build
node_modules/.bin/knex migrate:latest
npm run jest:e2e

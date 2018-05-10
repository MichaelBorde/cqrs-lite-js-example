#!/usr/bin/env bash

set -e

node_modules/.bin/knex migrate:latest
node build/server.js

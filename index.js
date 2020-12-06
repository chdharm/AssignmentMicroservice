#!/usr/bin/env node
require('module-alias/register');

const container = require('@src/container');
const server = container.resolve('server');
const logger = container.resolve('logger');

server.start().catch((error) => {
  logger.error(error.stack);
  process.exit();
});

const awilix = require('awilix');
const server = require('@src/server');
const routes = require('@src/router');
const logger = require('@src/utils/logger');
const db = require('@src/models/index');
const config = require('@src/config');
const auth = require('@src/services/auth');
const emailer = require('@src/utils/sendEmail');
const middleWare = require('@src/utils/middleWare');
const repositories = require('@src/repository');

const { createContainer, asValue, asFunction } = awilix;

const container = createContainer();

// SYSTEM
container.register({
  server: asFunction(server).singleton(),
  router: asFunction(routes).singleton(),
  logger: asFunction(logger).singleton(),
  auth: asFunction(auth).singleton(),
  db: asFunction(db).singleton(),
  emailer: asFunction(emailer).singleton(),
  middleWare: asFunction(middleWare).singleton(),
  config: asValue(config),
  repositories: asFunction(repositories).singleton(),
});

module.exports = container;

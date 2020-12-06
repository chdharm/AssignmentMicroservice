const bodyParser = require('body-parser');
const express = require('express');
const { partialRight } = require('ramda');

const controller = require('@src/utils/createController');

const { errorHandler } = require('@src/utils/errorHandler.js');

module.exports = ({
  config,
  logger,
  middleWare: { checkPermissions },
  auth: { passport },
}) => {
  const router = express.Router();

  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());

  const apiVersion = (router) => {
    router.use('/', controller('appDetail'));
    router.use('/assignment', controller('assignment'));
    return router;
  };
  //setting the base url for the rest api routers
  router.use('/api/v1', apiVersion(router));

  // 404, should be the last route.
  router.get('*', function(req, res) {
    res.status(404).json({ error: 'path does not exist' });
  });

  router.use(partialRight(errorHandler, [logger, config]));
  return router;
};

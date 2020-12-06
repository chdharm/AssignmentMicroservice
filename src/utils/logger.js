const log4js = require('log4js');

module.exports = () => {
  log4js.configure({
    appenders: {
      multi: {
        type: 'multiFile',
        base: 'logs/',
        property: 'level',
        extension: '.log',
        maxLogSize: process.env.logSize || 10485760,
        backups: 3,
        compress: true,
      },
    },
    categories: {
      default: { appenders: ['multi'], level: 'debug' },
    },
  });

  const logger = log4js.getLogger();
  // logger.level = process.env.LOG_LEVEL || 'ALL';

  return logger;
};

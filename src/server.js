const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

module.exports = ({ logger, router, config, db, auth: { passport } }) => {
  app.use(cors());

  app.use(router);

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '/views'));
  app.use(express.static('public'));

  app.use(passport.initialize());

  const start = () => {
    return new Promise((resolve, reject) => {
      const server = app.listen(process.env.PORT || 3000, (error) => {
        const { port } = server.address();

        if (error) reject(error);
        console.log(`🤘 API - Port ${port}`);
        resolve(server);
      });
    });
  };
  return { app, start };
};

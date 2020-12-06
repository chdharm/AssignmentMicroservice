const dotenv = require('dotenv');
dotenv.config().parsed;

module.exports = {
  port: process.env.PORT || 8000,
  dbType: process.env.DB_TYPE || 'mysql',
  dbHost: process.env.DB_HOST || 'localhost',
  dbName: process.env.DB_NAME || 'music_player',
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || 'root',
  appKey: process.env.APP_KEY || 'your_jwt_secret',
  appUrl: process.env.APP_URL,
  saltRounds: process.env.SALT_ROUND,
  username: process.env.email,
  password: process.env.password,
};

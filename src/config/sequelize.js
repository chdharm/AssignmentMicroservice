const dotenv = require('dotenv');
dotenv.config().parsed;

module.exports = {
  database: process.env.DB_NAME || 'music_player',
  dialect: process.env.DB_TYPE || 'mysql',
  username: process.env.DB_PASSWORD || 'root',
  password: process.env.DB_PASSWORD || 'root',
  host: process.env.DB_HOST || 'localhost',
};

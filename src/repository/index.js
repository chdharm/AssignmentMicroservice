const fs = require('fs');

module.exports = ({ db }) => {
  const modelRepositories = {};
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return;
    const factory = require(`../repository/${file}`);
    modelRepositories[file.split('.')[0]] = factory(db);
  });

  return {
    ...modelRepositories,
  };
};

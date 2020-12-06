const path = require('path');
/**
 *
 * @author Dharmpal Chaudhary
 * @param  { string } controllerUri
 * @returns { function } returns the controller
 *
 */
module.exports = function createControllerRoutes(controllerUri) {
  const controllerPath = path.resolve(
    __dirname,
    '../controllers',
    controllerUri,
  );
  const Controller = require(controllerPath);

  return Controller();
};

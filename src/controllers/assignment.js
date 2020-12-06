const HttpError = require('@src/utils/httpError');
const express = require('express');
const router = express.Router();
const container = require('@src/container');

const { repositories, logger } = container.cradle;
module.exports = () => {
  /**
   * @author Dharmpal Chaudhary
   * @params { object } req
   * @params { object } res
   * @description fetches all app configurations
   *
   * @swagger
   *
   * /app-configuration:
   *   get:
   *     tags:
   *       - App Configuration
   *     summary: Gets the app configuration set in the backend
   *     description: Returns user roles and permissions
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns the list of all the configuration
   *       404:
   *         $ref: '#/responses/NotFound'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *
   *   security:
   *     - bearerAuth: []
   *
   */
  router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { assignment } = repositories;
      const result = await assignment.getByID(id);
      res.json({ success: true, data: result });
    } catch (error) {
      logger.error(error.message);
      next(new HttpError(error));
    }
  });

  router.get('/', async (req, res, next) => {
    try {
      const { search } = req.query;
      console.log(search, 'i');
      const { assignment } = repositories;
      const result = await assignment.searchTag(search);
      return res.json({ success: true, data: result });
    } catch (error) {
      logger.error(error.message);
      next(new HttpError(error));
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const { name, title, description, duration, tags } = req.body;
      if (name && title && duration && tags) {
        const { assignment } = repositories;
        const assignMentdata = {
          name,
          title,
          description: description || '',
          duration,
        };
        const result = await assignment.create(assignMentdata, tags);

        return res.json(result);
      } else {
        return res.json({
          success: false,
          description: 'missing fields in body',
        });
      }
    } catch (error) {
      console.log(error);
      logger.error(error.message);
      next(new HttpError(error));
    }
  });

  return router;
};

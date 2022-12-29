const { verifyAccessToken } = require('../../http/middleware/verifyAccessToken');
const homeController = require('../../http/controllers/api/home.controller');
const router = require('express').Router();

/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: index page routes
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [IndexPage]
 *      description: get all need data for index page
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: notFound
 */
router.get('/', verifyAccessToken, homeController.indexPage);

module.exports = {
    HomeRoutes : router
}
const { verifyAccessToken } = require('../../http/middleware/verifyAccessToken');
const homeController = require('../../http/controllers/api/home.controller');
const router = require('express').Router();

router.get('/', homeController.indexPage);

module.exports = {
    HomeRoutes : router
}
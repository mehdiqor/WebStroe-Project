const { verifyAccessToken } = require('../http/middleware/verifyAccessToken');
const { DeveloperRoutes } = require('./admin/developer.routes');
const { UserAuthRoutes } = require('./user/auth.routes');
const { AdminRoutes } = require('./admin/admin.routes');
const { HomeRoutes } = require('./api/index.routes');
const router = require('express').Router();

router.use('/admin', verifyAccessToken, AdminRoutes);
router.use('/developer', DeveloperRoutes);
router.use('/user', UserAuthRoutes);
router.use('/', HomeRoutes);

module.exports = {
    Allroutes : router
}

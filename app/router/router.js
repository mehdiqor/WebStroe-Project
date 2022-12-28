const { verifyAccessToken, checkRole } = require('../http/middleware/verifyAccessToken');
const { DeveloperRoutes } = require('./admin/developer.routes');
<<<<<<< HEAD
const { verifyAccessToken, checkRole } = require('../http/middleware/verifyAccessToken');
=======
const { UserAuthRoutes } = require('./user/auth.routes');
const { AdminRoutes } = require('./admin/admin.routes');
const { HomeRoutes } = require('./api/index.routes');
>>>>>>> develop
const router = require('express').Router();

router.use('/user', UserAuthRoutes);
router.use('/admin', verifyAccessToken, checkRole("ADMIN"), AdminRoutes);
router.use('/developer', DeveloperRoutes);
router.use('/', HomeRoutes);

module.exports = {
    Allroutes : router
}

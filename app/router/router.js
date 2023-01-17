const { verifyAccessToken } = require('../http/middleware/verifyAccessToken');
const { checkPermission } = require('../http/middleware/permission.guard');
const { DeveloperRoutes } = require('./admin/developer.routes');
const { SupportRouter } = require('./support/support.routes');
const { qraphqlConfig } = require('../utils/graphql.config');
const { ApiPaymentRouter } = require('./api/payment.routes');
const { UserAuthRoutes } = require('./user/auth.routes');
const { AdminRoutes } = require('./admin/admin.routes');
const { HomeRoutes } = require('./api/index.routes');
const { PERMISSIONS } = require('../utils/costans');
const { graphqlHTTP } = require('express-graphql');
const router = require('express').Router();

router.use('/', HomeRoutes);
router.use('/user', UserAuthRoutes);
router.use('/admin', verifyAccessToken, AdminRoutes);
router.use('/developer', verifyAccessToken, checkPermission([PERMISSIONS.ADMIN]), DeveloperRoutes);
router.use("/graphql", graphqlHTTP(qraphqlConfig));
router.use("/gateway", verifyAccessToken, ApiPaymentRouter);
router.use("/support", SupportRouter)

module.exports = {
    Allroutes : router
}
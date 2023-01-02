const { checkPermission } = require('../../http/middleware/permission.guard');
const { AdminApiPermissionRouter } = require('./permission.routes');
const { AdminApiCategoryRouter } = require('./category.routes');
const { AdminApiProductRouter } = require('./product.routes');
const { AdminApiEpisodeRouter } = require('./episode.routes');
const { AdminApiChapterRouter } = require('./chapter.routes');
const { AdminApiCourseRouter } = require('./course.routes');
const { AdminApiBlogRouter } = require('./blog.routes');
const { AdminApiUserRouter } = require('./user.routes');
const { AdminApiRoleRouter } = require('./role.routes');
const { PERMISSIONS } = require('../../utils/costans');
const router = require('express').Router();

router.use("/category", checkPermission([PERMISSIONS.CONTENT_MANAGER]), AdminApiCategoryRouter);
router.use("/blogs", checkPermission([PERMISSIONS.TEACHER]), AdminApiBlogRouter);
router.use("/products", checkPermission([PERMISSIONS.SUPPLIER, PERMISSIONS.CONTENT_MANAGER]), AdminApiProductRouter);
router.use("/courses", checkPermission([PERMISSIONS.TEACHER]), AdminApiCourseRouter);
router.use("/chapter", checkPermission([PERMISSIONS.TEACHER]), AdminApiChapterRouter);
router.use("/episode", checkPermission([PERMISSIONS.TEACHER]), AdminApiEpisodeRouter);
router.use("/users", checkPermission([PERMISSIONS.USER]), AdminApiUserRouter);
router.use("/roles", checkPermission([PERMISSIONS.SUPERADMIN]), AdminApiRoleRouter);
router.use("/permissions", checkPermission([PERMISSIONS.SUPERADMIN]), AdminApiPermissionRouter);

module.exports = {
    AdminRoutes : router
}
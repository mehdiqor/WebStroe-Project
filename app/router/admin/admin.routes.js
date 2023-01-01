const { AdminApiPermissionRouter } = require('./permission.routes');
const { AdminApiCategoryRouter } = require('./category.routes');
const { AdminApiProductRouter } = require('./product.routes');
const { AdminApiEpisodeRouter } = require('./episode.routes');
const { AdminApiChapterRouter } = require('./chapter.routes');
const { AdminApiCourseRouter } = require('./course.routes');
const { AdminApiBlogRouter } = require('./blog.routes');
const { AdminApiUserRouter } = require('./user.routes');
const { AdminApiRoleRouter } = require('./role.routes');
const router = require('express').Router();

router.use("/category", AdminApiCategoryRouter);
router.use("/blogs", AdminApiBlogRouter);
router.use("/products", AdminApiProductRouter);
router.use("/courses", AdminApiCourseRouter);
router.use("/chapter", AdminApiChapterRouter);
router.use("/episode", AdminApiEpisodeRouter);
router.use("/users", AdminApiUserRouter);
router.use("/roles", AdminApiRoleRouter);
router.use("/permissions", AdminApiPermissionRouter);

module.exports = {
    AdminRoutes : router
}
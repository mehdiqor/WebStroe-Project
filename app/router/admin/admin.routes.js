const { AdminApiCategoryRouter } = require('./category.routes');
const { AdminApiProductRouter } = require('./product.routes');
const { AdminApiChapterRouter } = require('./chapter.routes');
const { AdminApiCourseRouter } = require('./course.routes');
const { AdminApiBlogRouter } = require('./blog.routes');
const router = require('express').Router();

router.use("/category", AdminApiCategoryRouter);
router.use("/products", AdminApiProductRouter);
router.use("/chapter", AdminApiChapterRouter);
router.use("/courses", AdminApiCourseRouter);
router.use("/blogs", AdminApiBlogRouter);

module.exports = {
    AdminRoutes : router
}
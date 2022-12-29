const { AdminApiCategoryRouter } = require('./category.routes');
const { AdminApiProductRouter } = require('./product.routes');
const { AdminApiCourseRouter } = require('./course.routes');
const { AdminApiBlogRouter } = require('./blog.routes');
const router = require('express').Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: action of admin
 *      -   name: Course
 *          description: course managment panel
 *      -   name: Product
 *          description: product managment panel
 *      -   name: Blog
 *          description: blog managment panel
 *      -   name: Category
 *          description: category managment panel
 */

router.use("/category", AdminApiCategoryRouter);
router.use("/products", AdminApiProductRouter);
router.use("/courses", AdminApiCourseRouter);
router.use("/blogs", AdminApiBlogRouter);

module.exports = {
    AdminRoutes : router
}
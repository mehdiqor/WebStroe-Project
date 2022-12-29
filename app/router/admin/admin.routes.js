const { AdminApiBlogRouter } = require('./blog.routes');
const { AdminApiCategoryRouter } = require('./category.routes');
const { AdminApiProductRouter } = require('./product.routes');
const router = require('express').Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: action of admin
 *      -   name: Product
 *          description: product managment panel
 *      -   name: Blog
 *          description: blog managment panel
 *      -   name: Category
 *          description: category managment panel
 */

router.use("/products", AdminApiProductRouter);
router.use("/blogs", AdminApiBlogRouter);
router.use("/category", AdminApiCategoryRouter);

module.exports = {
    AdminRoutes : router
}
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
 *          descripstion: product managment panel
 *      -   name: Blog
 *          description: blog managment panel
 *      -   name: Category
 *          description: Create-Update-Remove
 *      -   name: list-category
 *          description: list of categories
 */

router.use("/category", AdminApiCategoryRouter);
router.use("/blogs", AdminApiBlogRouter);
router.use("/products", AdminApiProductRouter);

module.exports = {
    AdminRoutes : router
}
const { CategoryController } = require('../../http/controllers/admin/category/category.controller');
const { checkPermission } = require('../../http/middleware/permission.guard');
const { PERMISSIONS } = require('../../utils/costans');
const router = require('express').Router();

router.post("/create", CategoryController.createCategory);
router.patch("/update/:id", CategoryController.updateCategory);
router.get("/list", CategoryController.getAllCategories);
router.get("/list-of-all", CategoryController.getAllCategoriesWithAggregate);
router.get("/parents", CategoryController.getAllParents);
router.get("/children/:parent", CategoryController.getChildOfParents);
router.get("/:id", CategoryController.getCategoryByID);
router.delete("/delete/:id", checkPermission([PERMISSIONS.ADMIN]), CategoryController.deleteCategory);

module.exports = {
    AdminApiCategoryRouter : router
}
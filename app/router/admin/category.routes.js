const { CategoryController } = require('../../http/controllers/admin/category/category.controller');
const router = require('express').Router();

router.post("/add", CategoryController.addCategory);
router.patch("/edit/:id", CategoryController.editCategoryTitle);
router.get("/parents", CategoryController.getAllParents);
router.get("/children/:parent", CategoryController.getChildOfParents);
router.get("/all", CategoryController.getAllCategory);
router.get("/list-of-all", CategoryController.getAllCategoryWithoutPopulate);
router.get("/:id", CategoryController.getCategoryByID);
router.delete("/remove/:id", CategoryController.removeCategory);

module.exports = {
    AdminApiCategoryRouter : router
}
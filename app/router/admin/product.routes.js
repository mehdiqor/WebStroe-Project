const { ProductController } = require('../../http/controllers/admin/product/product.controller');
const { stringToArray } = require('../../http/middleware/stringToArray');
const { uploadFile } = require('../../utils/multer');
const router = require('express').Router();

router.post("/add", uploadFile.array("images", 10), stringToArray("tags"), ProductController.addProduct);
router.patch("/edit/:id", uploadFile.array("images", 10), stringToArray("tags"), ProductController.editProduct);
router.get("/list-of-all", ProductController.getAllProduct);
router.get("/:id", ProductController.getProductByID);
router.delete("/remove/:id", ProductController.removeProductByID);

module.exports = {
    AdminApiProductRouter : router
}
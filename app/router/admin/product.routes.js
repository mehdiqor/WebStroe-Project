const { ProductController } = require('../../http/controllers/admin/product/product.controller');
const { checkPermission } = require('../../http/middleware/permission.guard');
const { stringToArray } = require('../../http/middleware/stringToArray');
const { PERMISSIONS } = require('../../utils/costans');
const { uploadFile } = require('../../utils/multer');
const router = require('express').Router();

router.post("/create", uploadFile.array("images", 10), stringToArray("tags"), ProductController.createProduct);
router.patch("/update/:id", uploadFile.array("images", 10), stringToArray("tags"), ProductController.updateProduct);
router.get("/list", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductByID);
router.delete("/delete/:id", checkPermission([PERMISSIONS.ADMIN]), ProductController.deleteProduct);

module.exports = {
    AdminApiProductRouter : router
}
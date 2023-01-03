const { AdminBlogController } = require("../../http/controllers/admin/blog/blog.controller");
const { checkPermission } = require("../../http/middleware/permission.guard");
const { stringToArray } = require("../../http/middleware/stringToArray");
const { PERMISSIONS } = require("../../utils/costans");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

router.post("/create", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.createBlog);
router.patch("/update/:id", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.UpdateBlog);
router.get("/list", AdminBlogController.getAllBlogs);
router.get("/:id", AdminBlogController.getBlogByID);
router.delete("/delete/:id", checkPermission([PERMISSIONS.ADMIN]), AdminBlogController.deleteBlog);

module.exports = {
    AdminApiBlogRouter : router
}
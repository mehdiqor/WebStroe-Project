const { AdminBlogController } = require("../../http/controllers/admin/blog/blog.controller");
const { stringToArray } = require("../../http/middleware/stringToArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

router.post("/add", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.createBlog);
router.patch("/edit/:id", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.UpdateBlogByID);
router.get("/list-of-all", AdminBlogController.getListOfBlogs);
router.get("/:id", AdminBlogController.getOneBlogByID);
router.delete("/remove/:id", AdminBlogController.deleteBlogByID);

module.exports = {
    AdminApiBlogRouter : router
}
const { CourseController } = require("../../http/controllers/admin/course.controller");
const { stringToArray } = require('../../http/middleware/stringToArray');
const { uploadFile } = require('../../utils/multer');
const router = require("express").Router();

router.post("/add-course", uploadFile.single("image"), stringToArray("tags"), CourseController.addCourse);
// router.put("/add-chapter")
// router.put("/add-episode")
// router.patch("/edit/:id")
router.get("/list-of-all", CourseController.getListOfProduct);
router.get("/:id", CourseController.getCourseByID);
// router.delete("/remove/:id")

module.exports = {
    AdminApiCourseRouter : router
}
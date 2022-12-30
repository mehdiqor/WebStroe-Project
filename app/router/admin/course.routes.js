const { CourseController } = require("../../http/controllers/admin/course/course.controller");
const { stringToArray } = require('../../http/middleware/stringToArray');
const { uploadFile } = require('../../utils/multer');
const router = require("express").Router();

router.post("/add", uploadFile.single("image"), stringToArray("tags"), CourseController.addCourse);
// router.put("/add-episode")
// router.patch("/edit/:id")
router.get("/list-of-all", CourseController.getListOfCourses);
router.get("/:id", CourseController.getCourseByID);
// router.delete("/remove/:id")

module.exports = {
    AdminApiCourseRouter : router
}
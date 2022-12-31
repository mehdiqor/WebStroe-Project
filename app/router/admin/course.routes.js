const { CourseController } = require("../../http/controllers/admin/course/course.controller");
const { stringToArray } = require('../../http/middleware/stringToArray');
const { uploadFile } = require('../../utils/multer');
const router = require("express").Router();

router.post("/add", uploadFile.single("image"), stringToArray("tags"), CourseController.addCourse);
router.get("/list-of-all", CourseController.getListOfCourses);
router.get("/:id", CourseController.getCourseByID);

module.exports = {
    AdminApiCourseRouter : router
}
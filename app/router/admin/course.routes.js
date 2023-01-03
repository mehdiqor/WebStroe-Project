const { CourseController } = require("../../http/controllers/admin/course/course.controller");
const { stringToArray } = require('../../http/middleware/stringToArray');
const { uploadFile } = require('../../utils/multer');
const router = require("express").Router();

router.post("/create", uploadFile.single("image"), stringToArray("tags"), CourseController.createCourse);
router.patch("/update/:id", uploadFile.single("image"), stringToArray("tags"), CourseController.updateCourse);
router.get("/list", CourseController.getAllCourses);
router.get("/:id", CourseController.getCourseByID);

module.exports = {
    AdminApiCourseRouter : router
}
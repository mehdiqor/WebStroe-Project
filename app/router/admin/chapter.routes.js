const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");
const router = require("express").Router();

router.put("/add", ChapterController.addChapter);
router.get("/list/:courseID", ChapterController.ListOfChapters);

module.exports = {
    AdminApiChapterRouter : router
}
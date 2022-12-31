const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");
const router = require("express").Router();

router.put("/add", ChapterController.addChapter);
router.patch("/edit/:chapterID", ChapterController.editChapterByID);
router.get("/list/:courseID", ChapterController.ListOfChapters);
router.patch("/remove/:chapterID", ChapterController.removeChapterByID);

module.exports = {
    AdminApiChapterRouter : router
}
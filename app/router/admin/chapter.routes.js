const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");
const router = require("express").Router();

router.put("/create", ChapterController.createChapter);
router.patch("/update/:chapterID", ChapterController.updateChapter);
router.get("/list/:courseID", ChapterController.getAllChapters);
router.patch("/delete/:chapterID", ChapterController.deleteChapter);

module.exports = {
    AdminApiChapterRouter : router
}
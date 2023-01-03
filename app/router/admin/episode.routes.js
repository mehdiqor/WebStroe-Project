const { EpisodeController } = require('../../http/controllers/admin/course/episode.controller');
const { uploadVideo } = require('../../utils/multer');
const router = require('express').Router();

router.post("/create", uploadVideo.single("video"), EpisodeController.createEpisode);
router.patch("/update/:episodeID", uploadVideo.single("video"), EpisodeController.updateEpisode);
router.delete("/delete/:episodeID", EpisodeController.deleteEpisode);

module.exports = {
    AdminApiEpisodeRouter : router
}
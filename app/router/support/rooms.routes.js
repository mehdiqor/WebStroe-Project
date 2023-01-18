const { RoomController } = require("../../http/controllers/support/room.controller");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

router.patch("/create", uploadFile.single("image"), RoomController.createRoom)
router.get("/list", RoomController.getAllRooms)

module.exports = {
    RoomRouter : router
}
const { MessageController } = require("../../http/controllers/support/message.controller");
const router = require("express").Router();

router.post("/create", MessageController.createMessage)
router.get("/list", MessageController.getAllMessages)

module.exports = {
    MessageRouter : router
}
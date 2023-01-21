const { SupportController } = require("../../http/controllers/support/support.controller");
const { NamespaceRouter } = require("./namespace.routes");
const { RoomRouter } = require("./rooms.routes");
const router = require("express").Router();

router.get("/", SupportController.renderChatRoom);
router.get("/login", SupportController.loginForm);
router.post("/login", SupportController.login);
router.use("/namespace", NamespaceRouter);
router.use("/room", RoomRouter);

module.exports = {
    SupportRouter : router
}
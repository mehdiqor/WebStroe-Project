const { SupportController } = require("../../http/controllers/support/support.controller");
const { checkLogin, checkAccessLogin } = require("../../http/middleware/auth");
const { NamespaceRouter } = require("./namespace.routes");
const { RoomRouter } = require("./rooms.routes");
const router = require("express").Router();

router.get("/", checkLogin, SupportController.renderChatRoom);
router.get("/login", checkAccessLogin, SupportController.loginForm);
router.post("/login", checkAccessLogin, SupportController.login);
router.use("/namespace", NamespaceRouter);
router.use("/room", RoomRouter);

module.exports = {
    SupportRouter : router
}
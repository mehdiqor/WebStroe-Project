const { NamespaceController } = require("../../http/controllers/support/namespace.controller");
const router = require("express").Router();

router.post("/create", NamespaceController.createNamespace)
router.get("/list", NamespaceController.getAllNamespaces)

module.exports = {
    NamespaceRouter : router
}
const { PermissionController } = require("../../http/controllers/admin/RBAC/permissions.controller");
const router = require("express").Router();

router.post("/add", PermissionController.addPermission);
router.get("/list", PermissionController.getAllPermissions);
router.delete("/remove/:id", PermissionController.removePermission);

module.exports = {
    AdminApiPermissionRouter : router
}
const { PermissionController } = require("../../http/controllers/admin/RBAC/permissions.controller");
const router = require("express").Router();

router.post("/create", PermissionController.createPermission);
router.patch("/update/:id", PermissionController.updatePermission);
router.get("/list", PermissionController.getAllPermissions);
router.delete("/delete/:id", PermissionController.deletePermission);

module.exports = {
    AdminApiPermissionRouter : router
}
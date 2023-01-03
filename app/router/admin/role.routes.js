const { RoleController } = require("../../http/controllers/admin/RBAC/role.controller");
const { stringToArray } = require("../../http/middleware/stringToArray");
const router = require("express").Router();

router.post("/create", stringToArray("permissions"), RoleController.createRole);
router.patch("/update/:id", stringToArray("permissions"), RoleController.updateRole);
router.get("/list", RoleController.getAllRoles);
router.delete("/delete/:field", RoleController.deleteRole);

module.exports = {
    AdminApiRoleRouter : router
}
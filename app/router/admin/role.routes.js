const { RoleController } = require("../../http/controllers/admin/RBAC/role.controller");
const { stringToArray } = require("../../http/middleware/stringToArray");
const router = require("express").Router();

router.post("/add", stringToArray("permissions"), RoleController.addRole);
router.patch("/update/:id", stringToArray("permissions"), RoleController.updateRole);
router.get("/list", RoleController.getAllRoles);
router.delete("/remove/:field", RoleController.removeRole);

module.exports = {
    AdminApiRoleRouter : router
}
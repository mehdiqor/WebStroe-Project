const { RoleController } = require("../../http/controllers/admin/RBAC/role.controller");
const { stringToArray } = require("../../http/middleware/stringToArray");
const router = require("express").Router();

router.post("/add", stringToArray("permissions"), RoleController.addRole);
router.get("/list", RoleController.getAllRoles);

module.exports = {
    AdminApiRoleRouter : router
}
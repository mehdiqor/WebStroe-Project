const { UserController } = require('../../http/controllers/admin/users/user.controller');
const { checkPermission } = require('../../http/middleware/permission.guard');
const { PERMISSIONS } = require('../../utils/costans');
const router = require('express').Router();

router.patch("/update/:id", UserController.updateUserProfile);
router.get("/profile", UserController.UserProfile);
router.get("/list", checkPermission([PERMISSIONS.ADMIN]), UserController.getAllUsers);

module.exports = {
    AdminApiUserRouter : router
}
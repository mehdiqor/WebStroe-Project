const { UserController } = require('../../http/controllers/admin/users/user.controller');
const router = require('express').Router();

router.patch("/update/:id", UserController.updateUserProfile);
router.get("/list", UserController.getAllUsers);

module.exports = {
    AdminApiUserRouter : router
}
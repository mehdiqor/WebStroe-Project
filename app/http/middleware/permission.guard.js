const { PERMISSIONS, PROCCESS_MASSAGES } = require("../../utils/costans");
const { PermissionModel } = require("../../models/permission");
const { RoleModel } = require("../../models/role");
const httpError = require("http-errors");

function checkPermission(requiredPermissions = []){
    return async function(req, res, next){
        try {
            const allPermissions = requiredPermissions.flat(2);
            const user = req.user;
            const role = await RoleModel.findOne({title: user.Role});
            const permissions = await PermissionModel.find({_id : {$in : role.permissions}});
            const userPermissions = permissions.map(item => item.name);
            const hasPermission = allPermissions.every(permission => {
                return userPermissions.includes(permission)
            });
            console.log(allPermissions);
            console.log(userPermissions);
            if(userPermissions.includes(PERMISSIONS.ALL)) return next();
            if(allPermissions.length == 0 || hasPermission) return next();
                throw httpError.Forbidden(PROCCESS_MASSAGES.NO_PERMISSION);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    checkPermission
}
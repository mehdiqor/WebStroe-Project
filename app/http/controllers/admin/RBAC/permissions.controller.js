const { PermissionsModel } = require("../../../../models/permission");
const Controller = require("../../controller");
const { StatusCodes : httpStatus } = require("http-status-codes");
const httpError = require("http-errors");

class PermissionController extends Controller{
    async getAllPermissions(req, res, next){
        try {
            const permission = await PermissionsModel.find({})
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    permission
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    PermissionController : new PermissionController()
}
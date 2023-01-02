const { addPermissionSchema } = require("../../../validators/admin/RBAC.schema");
const { PermissionsModel } = require("../../../../models/permission");
const { StatusCodes : httpStatus } = require("http-status-codes");
const Controller = require("../../controller");
const httpError = require("http-errors");

class PermissionController extends Controller{
    async addPermission(req, res, next){
        try {
            await addPermissionSchema.validateAsync(req.body);
            const {name, description} = req.body;
            await this.checkExistPermissionWithName(name);
            const permission = await PermissionsModel.create({name, description});
            if(!permission) throw httpError.InternalServerError("دسترسی ایجاد نشد");
            return res.status(httpStatus.CREATED).json({
                StatusCode : httpStatus.CREATED,
                data : {
                    message : "دسترسی با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
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
    async removePermission(req, res, next){
        try {
            const {id} = req.params;
            await this.findPermissionByID(id);
            const removePermissionResult = await PermissionsModel.deleteOne({_id : id});
            if(!removePermissionResult.deletedCount) throw httpError.InternalServerError("سطح دسترسی حذف نشد");
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    message : "سطح دسترسی با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findPermissionByID(_id){
        const permission = await PermissionsModel.findOne({_id});
        if(!permission) throw httpError.NotFound("سطح دسترسی مورد نظر یافت نشد");
        return permission
    }
    async checkExistPermissionWithName(name){
        const permission = await PermissionsModel.findOne({name});
        if(permission) httpError.BadRequest("سطح دسترسی مورد نظر قبلا ثبت شده");
    }
}

module.exports = {
    PermissionController : new PermissionController()
}
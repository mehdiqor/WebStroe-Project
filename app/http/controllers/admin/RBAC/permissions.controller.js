const { addPermissionSchema } = require("../../../validators/admin/RBAC.schema");
const { PermissionModel } = require("../../../../models/permission");
const { StatusCodes : httpStatus } = require("http-status-codes");
const Controller = require("../../controller");
const httpError = require("http-errors");

class PermissionController extends Controller{
    async addPermission(req, res, next){
        try {
            await addPermissionSchema.validateAsync(req.body);
            const {name, description} = req.body;
            await this.checkExistPermissionWithName(name);
            const permission = await PermissionModel.create({name, description});
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
    async updatePermission(req, res, next){
        try {
            const {id} = req.params;
            const data = copyObject(req.body);
            deleteInvalidPropertyInObject(data, [])
            const permission = await this.findPermissionByIdOrTitle(id);
            const updatePermissionResult = await PermissionModel.updateOne(
                {
                    _id : permission._id
                },
                {
                    $set : data
                }
            );
            if(!updatePermissionResult.modifiedCount) throw httpError.InternalServerError("بروزرسانی نقش انجام نشد");
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    message : "نقش با موفقیت بروزرسانی شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllPermissions(req, res, next){
        try {
            const permission = await PermissionModel.find({})
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
            const removePermissionResult = await PermissionModel.deleteOne({_id : id});
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
        const permission = await PermissionModel.findOne({_id});
        if(!permission) throw httpError.NotFound("سطح دسترسی مورد نظر یافت نشد");
        return permission
    }
    async checkExistPermissionWithName(name){
        const permission = await PermissionModel.findOne({name});
        if(permission) httpError.BadRequest("سطح دسترسی مورد نظر قبلا ثبت شده");
    }
}

module.exports = {
    PermissionController : new PermissionController()
}
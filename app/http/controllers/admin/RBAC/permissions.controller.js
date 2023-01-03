const { copyObject, deleteInvalidPropertyInObject } = require("../../../../utils/fuctions");
const { addPermissionSchema } = require("../../../validators/admin/RBAC.schema");
const { PermissionModel } = require("../../../../models/permission");
const { PROCCESS_MASSAGES } = require("../../../../utils/costans");
const { StatusCodes : httpStatus } = require("http-status-codes");
const Controller = require("../../controller");
const httpError = require("http-errors");

class PermissionController extends Controller{
    async createPermission(req, res, next){
        try {
            await addPermissionSchema.validateAsync(req.body);
            const {name, description} = req.body;
            await this.checkExistPermissionWithName(name);
            const permission = await PermissionModel.create({name, description});
            if(!permission) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_CAREATED);
            return res.status(httpStatus.CREATED).json({
                StatusCode : httpStatus.CREATED,
                data : {
                    message : PROCCESS_MASSAGES.CAREATED
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updatePermission(req, res, next){
        try {
            const {id} = req.params;
            await this.findPermissionByID(id);
            const data = copyObject(req.body);
            deleteInvalidPropertyInObject(data, [])
            const updatePermissionResult = await PermissionModel.updateOne(
                {
                    _id : id
                },
                {
                    $set : data
                }
            );
            if(!updatePermissionResult.modifiedCount) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_UPDATED);
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    message : PROCCESS_MASSAGES.UPDATED
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
    async deletePermission(req, res, next){
        try {
            const {id} = req.params;
            await this.findPermissionByID(id);
            const removePermissionResult = await PermissionModel.deleteOne({_id : id});
            if(!removePermissionResult.deletedCount) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_DELETED);
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    message : PROCCESS_MASSAGES.DELETED
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
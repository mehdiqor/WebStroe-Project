const { addRoleSchema } = require("../../../validators/admin/RBAC.schema");
const { StatusCodes : httpStatus } = require("http-status-codes");
const { copyObject, deleteInvalidPropertyInObject } = require("../../../../utils/fuctions");
const { RoleModel } = require("../../../../models/role");
const { default: mongoose } = require("mongoose");
const Controller = require("../../controller");
const httpError = require("http-errors");

class RoleController extends Controller{
    async addRole(req, res, next){
        try {
            await addRoleSchema.validateAsync(req.body);
            const {title, description, permissions} = req.body;
            console.log(title);
            await this.findRoleWithTitle(title);
            const role = await RoleModel.create({title, description, permissions});
            if(!role) throw httpError.InternalServerError("نقش ایجاد نشد");
            return res.status(httpStatus.CREATED).json({
                StatusCode : httpStatus.CREATED,
                data : {
                    message : "نقش با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateRole(req, res, next){
        try {
            const {id} = req.params;
            const data = copyObject(req.body);
            deleteInvalidPropertyInObject(data, [])
            const role = await this.findRoleByIdOrTitle(id);
            const updateRoleResult = await RoleModel.updateOne(
                {
                    _id : role._id
                },
                {
                    $set : data
                }
            );
            if(!updateRoleResult.modifiedCount) throw httpError.InternalServerError("بروزرسانی نقش انجام نشد");
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
    async getAllRoles(req, res, next){
        try {
            const roles = await RoleModel.find({});
            return res.status(httpStatus.OK).json({
                StatusCode : httpStatus.OK,
                data : {
                    roles
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removeRole(req, res, next){
        try {
            const {field} = req.params;
            const role = await this.findRoleByIdOrTitle(field);
            const removeRoleResult = await RoleModel.deleteOne({_id : role._id});
            if(!removeRoleResult.deletedCount) throw httpError.InternalServerError("حذف نقش انجام نشد");
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    message : "نقش با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findRoleByIdOrTitle(field){
        let findQuery = mongoose.isValidObjectId(field) ? {_id : field} : {title : field};
        const role = await RoleModel.findOne(findQuery);
        if(!role) throw httpError.NotFound("نقش مورد نظر یافت نشد");
        return role
    }
    async findRoleWithTitle(title){
        const role = await RoleModel.findOne({title});
        if(role) httpError.BadRequest("نقش یا رول مورد نظر قبلا ثبت شده");
    }
}

module.exports = {
    RoleController : new RoleController()
}
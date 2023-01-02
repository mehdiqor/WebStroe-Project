const { RoleModel } = require("../../../../models/role");
const Controller = require("../../controller");
const { StatusCodes : httpStatus } = require("http-status-codes");
const httpError = require("http-errors");
const { addRoleSchema } = require("../../../validators/admin/RBAC.schema");
const { default: mongoose } = require("mongoose");

class RoleController extends Controller{
    async addRole(req, res, next){
        try {
            await addRoleSchema.validateAsync(req.body);
            const {title, permissions} = req.body;
            console.log(title);
            await this.findRoleWithTitle(title);
            const role = await RoleModel.create({title, permissions});
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
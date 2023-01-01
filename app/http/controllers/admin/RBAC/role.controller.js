const { RoleModel } = require("../../../../models/role");
const Controller = require("../../controller");
const { StatusCodes : httpStatus } = require("http-status-codes");
const httpError = require("http-errors");
const { addRoleSchema } = require("../../../validators/admin/RBAC.schema");

class RoleController extends Controller{
    async addRole(req, res, next){
        try {
            const {title, permissions} = addRoleSchema.validateAsync(req.body);
            await this.findRoleWithTitle(title);
            console.log(title);
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
    async findRoleWithTitle(title){
        const role = await RoleModel.findOne({title});
        if(role) httpError.BadRequest("نقش یا رول مورد نظر قبلا ثبت شده");
    }
}

module.exports = {
    RoleController : new RoleController()
}
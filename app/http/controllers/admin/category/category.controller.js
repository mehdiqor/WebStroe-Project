const { addCategorySchema, updateCategorySchema } = require("../../../validators/admin/category.schema");
const { PROCCESS_MASSAGES } = require("../../../../utils/costans");
const { CategoryModel } = require("../../../../models/categories");
const { StatusCodes : httpStatus } = require('http-status-codes');
const Controller = require("../../controller");
const httpError = require("http-errors");
const mongoose = require("mongoose");

class CategoryController extends Controller {
    async createCategory(req, res, next){
        try {
            await addCategorySchema.validateAsync(req.body);
            const {title, parent} = req.body;
            const category = await CategoryModel.create({title, parent});
            if(!category) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_CAREATED);
            return res.status(httpStatus.CREATED).json({
                statusCode : httpStatus.CREATED,
                data : {
                    message : PROCCESS_MASSAGES.CAREATED
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateCategory(req, res, next){
        try {
            const {id} = req.params;
            const {title} = req.body;
            const category = await this.checkExistCategory(id);
            await updateCategorySchema.validateAsync(req.body)
            const updateResult = await CategoryModel.updateOne({_id : id}, {$set : {title}})
            if(updateResult.modifiedCount == 0) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_UPDATED);
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
    async getAllCategories(req, res, next){
        try {
            const categories = await CategoryModel.find({parent : undefined}, {__v : 0})
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllCategoriesWithAggregate(req, res, next){
        try {
            const categories = await CategoryModel.aggregate([
                {
                    $match : {}
                }
            ]);
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllParents(req, res, next){
        try {
            const parents = await CategoryModel.find({parent : undefined}, {__v : 0});
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    parents
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getChildOfParents(req, res, next){
        try {
            const {parent} = req.params;
            const children = await CategoryModel.find({parent}, {__v : 0, parent : 0});
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    children
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getCategoryByID(req, res, next){
        try {
            const {id} = req.params;
            const category = await CategoryModel.aggregate([
                {
                    $match : {
                        _id : mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup : {
                        from : "categories",
                        localField : "_id",
                        foreignField : "parent",
                        as : "children"
                    }
                },
                {
                    $project : {
                        __v : 0,
                        "children.__v" : 0,
                        "children.parent" : 0
                    }
                }
            ]);
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    category
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async deleteCategory(req, res, next){
        try {
            const {id} = req.params;
            const category = await this.checkExistCategory(id);
            const deleteResult = await CategoryModel.deleteMany({
                $or : [
                    {_id : category._id},
                    {parent : category._id}
                ]
            });
            if(deleteResult.deletedCount == 0) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_DELETED);
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
    async checkExistCategory(id){
        const category = await CategoryModel.findById(id);
        if(!category) throw httpError.NotFound("دسته بندی یافت نشد");
        return category
    }
}

module.exports = {
    CategoryController : new CategoryController
}
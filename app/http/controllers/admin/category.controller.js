const { addCategorySchema, updateCategorySchema } = require("../../validators/admin/category.schema");
const { StatusCodes : httpStatus } = require('http-status-codes');
const { CategoryModel } = require("../../../models/categories");
const Controller = require("../controller");
const createError = require("http-errors");
const mongoose = require("mongoose");

class CategoryController extends Controller {
    async addCategory(req, res, next){
        try {
            await addCategorySchema.validateAsync(req.body);
            const {title, parent} = req.body;
            const category = await CategoryModel.create({title, parent});
            if(!category) throw createError.InternalServerError('خطای داخلی!');
            return res.status(httpStatus.CREATED).json({
                data : {
                    statusCode : httpStatus.CREATED,
                    message : "دسته بندی با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removeCategory(req, res, next){
        try {
            const {id} = req.params;
            const category = await this.checkExistCategory(id);
            const deleteResult = await CategoryModel.deleteMany({
                $or : [
                    {_id : category._id},
                    {parent : category._id}
                ]
            });
            if(deleteResult.deletedCount == 0) throw createError.InternalServerError("حذف دسته بندی انجام نشد");
            return res.status(httpStatus.OK).json({
                data : {
                    statusCode : httpStatus.OK,
                    message : "حذف دسته بندی با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async editCategoryTitle(req, res, next){
        try {
            const {id} = req.params;
            const {title} = req.body;
            const category = await this.checkExistCategory(id);
            await updateCategorySchema.validateAsync(req.body)
            const updateResult = await CategoryModel.updateOne({_id : id}, {$set : {title}})
            if(updateResult.modifiedCount == 0) throw createError.InternalServerError("متاسفانه دسته بندی بروزرسانی نشد");
            return res.status(httpStatus.OK).json({
                data : {
                    statusCode : httpStatus.OK,
                    message : "بروزرسانی با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllCategory(req, res, next){
        try {
            const categories = await CategoryModel.find({parent : undefined}, {__v : 0})
            return res.status(httpStatus.OK).json({
                data : {
                    statusCode : httpStatus.OK,
                    categories
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
                data : {
                    statusCode : httpStatus.OK,
                    category
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
                data : {
                    statusCode : httpStatus.OK,
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
                data : {
                    statusCode : httpStatus.OK,
                    children
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllCategoryWithoutPopulate(req, res, next){
        try {
            const categories = await CategoryModel.aggregate([
                {
                    $match : {}
                }
            ]);
            return res.status(httpStatus.OK).json({
                data : {
                    statusCode : httpStatus.OK,
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async checkExistCategory(id){
        const category = await CategoryModel.findById(id);
        if(!category) throw createError.NotFound("دسته بندی یافت نشد");
        return category
    }
}

module.exports = {
    CategoryController : new CategoryController
}
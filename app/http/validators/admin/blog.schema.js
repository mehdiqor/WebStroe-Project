const joi = require('@hapi/joi');
const httpError = require('http-errors');
const {mongoIdPattern} = require('../../../utils/costans');

const createBlogsSchema = joi.object({
    title : joi.string().min(3).max(30).error(httpError.BadRequest('عنوان دسته بندی صحیح نمی باشد')),
    text : joi.string().error(httpError.BadRequest('متن ارسال شده صحیح نمی باشد')),
    short_text : joi.string().error(httpError.BadRequest('متن ارسال شده صحیح نمی باشد')),
    filename : joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(httpError.BadRequest('برچسب ها نمی توانند بیشتر از 20 نویسه باشند')),
    tags : joi.array().min(0).max(20).error(httpError.BadRequest('عنوان دسته بندی صحیح نمی باشد')),
    category : joi.string().pattern(mongoIdPattern).error(httpError.BadRequest('دسته بندی مورد نظر یافت نشد')),
    fileUploadPath : joi.allow()
});

module.exports = {
    createBlogsSchema
}
const joi = require('@hapi/joi');
const createError = require('http-errors');
const {mongoIdPattern} = require('../../../utils/costans');

const createCourseSchema = joi.object({
    title : joi.string().min(3).max(30).error(createError.BadRequest('عنوان دوره صحیح نمی باشد')),
    text : joi.string().error(createError.BadRequest('متن ارسال شده صحیح نمی باشد')),
    short_text : joi.string().error(createError.BadRequest('متن ارسال شده صحیح نمی باشد')),
    tags : joi.array().min(0).max(20).error(createError.BadRequest('برچسب ها نمی توانند بیشتر از 20 نویسه باشند')),
    category : joi.string().regex(mongoIdPattern).error(createError.BadRequest('دسته بندی مورد نظر یافت نشد')),
    price : joi.number().error(createError.BadRequest('قیمت وارد شده صحیح نمیباشد')),
    discount : joi.number().error(createError.BadRequest('تخفیف وارد شده صحیح نمیباشد')),
    status : joi.string().regex(/(notStarted|inProgress|completed)/i),
    type : joi.string().regex(/(free|cash|special)/i),
    filename : joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest('فرمت تصویر صحیح نیست')),
    fileUploadPath : joi.allow()
});
const createEpisodeSchema = joi.object({
    title : joi.string().min(3).max(30).error(createError.BadRequest('عنوان دوره صحیح نمی باشد')),
    text : joi.string().error(createError.BadRequest('متن ارسال شده صحیح نمی باشد')),
    type : joi.string().regex(/(lock|unlock)/i),
    time : joi.string().regex(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/i),
    chapterID : joi.string().regex(mongoIdPattern).error(createError.BadRequest('شناسه فصل صحیح نمیباشد')),
    courseID : joi.string().regex(mongoIdPattern).error(createError.BadRequest('شناسه دوره صحیح نمیباشد'))
});

module.exports = {
    createCourseSchema,
    createEpisodeSchema
}
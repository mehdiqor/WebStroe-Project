const joi = require('@hapi/joi');
const httpError = require('http-errors');
const {mongoIdPattern} = require('../../../utils/costans');

const createCourseSchema = joi.object({
    title : joi.string().min(3).max(30).error(httpError.BadRequest('عنوان دوره صحیح نمی باشد')),
    text : joi.string().error(httpError.BadRequest('متن ارسال شده صحیح نمی باشد')),
    short_text : joi.string().error(httpError.BadRequest('متن ارسال شده صحیح نمی باشد')),
    tags : joi.array().min(0).max(20).error(httpError.BadRequest('برچسب ها نمی توانند بیشتر از 20 نویسه باشند')),
    category : joi.string().regex(mongoIdPattern).error(httpError.BadRequest('دسته بندی مورد نظر یافت نشد')),
    price : joi.number().error(httpError.BadRequest('قیمت وارد شده صحیح نمیباشد')),
    discount : joi.number().error(httpError.BadRequest('تخفیف وارد شده صحیح نمیباشد')),
    status : joi.string().regex(/(notStarted|inProgress|completed)/i),
    type : joi.string().regex(/(free|cash|special)/i),
    filename : joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(httpError.BadRequest('فرمت تصویر صحیح نیست')),
    fileUploadPath : joi.allow()
});
const createEpisodeSchema = joi.object({
    title : joi.string().min(3).max(30).error(httpError.BadRequest('عنوان دوره صحیح نمی باشد')),
    text : joi.string().error(httpError.BadRequest('متن ارسال شده صحیح نمی باشد')),
    type : joi.string().regex(/(lock|unlock)/i),
    courseID : joi.string().regex(mongoIdPattern).error(httpError.BadRequest('شناسه دوره صحیح نمیباشد')),
    chapterID : joi.string().regex(mongoIdPattern).error(httpError.BadRequest('شناسه فصل صحیح نمیباشد')),
    filename : joi.string().regex(/(\.avi|\.mpg|\.rm|\.mov|\.wav|\.asf|\.3gp|\.mkv|\.rmvb|\.mp4|\.ogg|\.mp3|\.oga|\.aac|\.mpeg|\.webm)$/).error(httpError.BadRequest('فرمت ویدیو صحیح نیست')),
    fileUploadPath : joi.allow()
});

module.exports = {
    createCourseSchema,
    createEpisodeSchema
}
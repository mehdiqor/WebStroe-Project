const joi = require('@hapi/joi');
const httpError = require('http-errors');
const {mongoIdPattern} = require('../../../utils/costans');

const createProductSchema = joi.object({
    title : joi.string().min(3).max(30).error(httpError.BadRequest('عنوان محصول صحیح نمی باشد')),
    text : joi.string().error(httpError.BadRequest('متن ارسال شده صحیح نمی باشد')),
    short_text : joi.string().error(httpError.BadRequest('متن ارسال شده صحیح نمی باشد')),
    tags : joi.array().min(0).max(20).error(httpError.BadRequest('برچسب ها نمی توانند بیشتر از 20 نویسه باشند')),
    colors : joi.array().items(joi.string()).min(0).max(20).error(httpError.BadRequest('تعداد رنگ نمی تواند بیش از 20 رنگ باشد')),
    category : joi.string().regex(mongoIdPattern).error(httpError.BadRequest('دسته بندی مورد نظر یافت نشد')),
    price : joi.number().error(httpError.BadRequest('قیمت وارد شده صحیح نمیباشد')),
    discount : joi.number().error(httpError.BadRequest('تخفیف وارد شده صحیح نمیباشد')),
    count : joi.number().error(httpError.BadRequest('تعداد وارد شده صحیح نمیباشد')),
    weight : joi.number().allow(null, 0, "0").error(httpError.BadRequest('وزن وارد شده صحیح نمیباشد')),
    height : joi.number().allow(null, 0, "0").error(httpError.BadRequest('ارتفاع وارد شده صحیح نمیباشد')),
    width : joi.number().allow(null, 0, "0").error(httpError.BadRequest('عرض وارد شده صحیح نمیباشد')),
    lenght : joi.number().allow(null, 0, "0").error(httpError.BadRequest('طول وارد شده صحیح نمیباشد')),
    type : joi.string().regex(/(virtual|physical)/i),
    filename : joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(httpError.BadRequest('فرمت تصویر صحیح نیست')),
    fileUploadPath : joi.allow()
});

module.exports = {
    createProductSchema
}
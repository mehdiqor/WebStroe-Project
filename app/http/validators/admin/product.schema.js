const joi = require('@hapi/joi');
const createError = require('http-errors');
const {mongoIdPattern} = require('../../../utils/costans');

const createProductSchema = joi.object({
    title : joi.string().min(3).max(30).error(createError.BadRequest('عنوان دسته بندی صحیح نمی باشد')),
    text : joi.string().error(createError.BadRequest('متن ارسال شده صحیح نمی باشد')),
    short_text : joi.string().error(createError.BadRequest('متن ارسال شده صحیح نمی باشد')),
    tags : joi.array().min(0).max(20).error(createError.BadRequest('عنوان دسته بندی صحیح نمی باشد')),
    category : joi.string().regex(mongoIdPattern).error(createError.BadRequest('دسته بندی مورد نظر یافت نشد')),
    price : joi.number().error(createError.BadRequest('قیمت وارد شده صحیح نمیباشد')),
    discount : joi.number().error(createError.BadRequest('تخفیف وارد شده صحیح نمیباشد')),
    count : joi.number().error(createError.BadRequest('تعداد وارد شده صحیح نمیباشد')),
    weight : joi.number().allow(null, 0, "0").error(createError.BadRequest('وزن وارد شده صحیح نمیباشد')),
    height : joi.number().allow(null, 0, "0").error(createError.BadRequest('ارتفاع وارد شده صحیح نمیباشد')),
    width : joi.number().allow(null, 0, "0").error(createError.BadRequest('عرض وارد شده صحیح نمیباشد')),
    lenght : joi.number().allow(null, 0, "0").error(createError.BadRequest('طول وارد شده صحیح نمیباشد')),
    type : joi.string().regex(/(virtual |physical)/i),
    filename : joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest('برچسب ها نمی توانند بیشتر از 20 نویسه باشند')),
    fileUploadPath : joi.allow()
});

module.exports = {
    createProductSchema
}
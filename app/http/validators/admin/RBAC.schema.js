const joi = require('@hapi/joi');
const { mongoIdPattern } = require('../../../utils/costans');

const addRoleSchema = joi.object({
    title : joi.string().min(3).max(30).error(new Error("عنوان نقش صحیح نمیباشد")),
    permissions : joi.array().items(joi.string().pattern(mongoIdPattern)).allow("").error(new Error("سطوح دسترسی های ارسال شده صحیح نمیباشد"))
});

module.exports = {
    addRoleSchema
}
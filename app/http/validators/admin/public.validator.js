const joi = require('@hapi/joi');
const createError = require('http-errors');
const { mongoIdPattern } = require('../../../utils/costans');

const ObjectIdValidator = joi.object({
    id : joi.string().pattern(mongoIdPattern).error(new Error(createError.BadRequest("شناسه وارد شده صحیح نمیباشد")))
});

module.exports = {
    ObjectIdValidator
}
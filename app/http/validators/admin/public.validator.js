const joi = require('@hapi/joi');
const httpError = require('http-errors');
const { mongoIdPattern } = require('../../../utils/costans');

const ObjectIdValidator = joi.object({
    id : joi.string().pattern(mongoIdPattern).error(new Error(httpError.BadRequest("شناسه وارد شده صحیح نمیباشد")))
});

module.exports = {
    ObjectIdValidator
}
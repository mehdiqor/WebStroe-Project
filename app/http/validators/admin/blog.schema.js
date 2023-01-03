const {mongoIdPattern, validationError} = require('../../../utils/costans');
const httpError = require('http-errors');
const joi = require('@hapi/joi');

const createBlogsSchema = joi.object({
    title : joi.string().min(3).max(30).error(httpError.BadRequest(validationError("title"))),
    text : joi.string().error(httpError.BadRequest(validationError('text'))),
    short_text : joi.string().error(httpError.BadRequest(validationError('short_text'))),
    filename : joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(httpError.BadRequest(validationError('file format'))),
    tags : joi.array().min(0).max(20).error(httpError.BadRequest(validationError('tags'))),
    category : joi.string().pattern(mongoIdPattern).error(httpError.BadRequest(validationError('category'))),
    fileUploadPath : joi.allow()
});

module.exports = {
    createBlogsSchema
}
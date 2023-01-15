const { validationError } = require('../../../utils/fuctions');
const {mongoIdPattern} = require('../../../utils/costans');
const httpError = require('http-errors');
const joi = require('@hapi/joi');

const createCourseSchema = joi.object({
    title : joi.string().min(3).max(30).error(httpError.BadRequest(validationError('title'))),
    text : joi.string().error(httpError.BadRequest(validationError('text'))),
    short_text : joi.string().error(httpError.BadRequest(validationError('short_text'))),
    tags : joi.array().min(0).max(20).error(httpError.BadRequest(validationError('tags'))),
    category : joi.string().regex(mongoIdPattern).error(httpError.BadRequest(validationError('category ID'))),
    price : joi.number().error(httpError.BadRequest(validationError('price'))),
    discount : joi.number().error(httpError.BadRequest(validationError('discount'))),
    status : joi.string().regex(/(notStarted|inProgress|completed)/i),
    type : joi.string().regex(/(free|cash|special)/i),
    filename : joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(httpError.BadRequest(validationError('file format'))),
    fileUploadPath : joi.allow()
});
const createEpisodeSchema = joi.object({
    title : joi.string().min(3).max(30).error(httpError.BadRequest(validationError('title'))),
    text : joi.string().error(httpError.BadRequest(validationError('text'))),
    type : joi.string().regex(/(lock|unlock)/i),
    courseID : joi.string().regex(mongoIdPattern).error(httpError.BadRequest(validationError('course ID'))),
    chapterID : joi.string().regex(mongoIdPattern).error(httpError.BadRequest(validationError('chapter ID'))),
    filename : joi.string().regex(/(\.avi|\.mpg|\.rm|\.mov|\.wav|\.asf|\.3gp|\.mkv|\.rmvb|\.mp4|\.ogg|\.mp3|\.oga|\.aac|\.mpeg|\.webm)$/).error(httpError.BadRequest(validationError('file format'))),
    fileUploadPath : joi.allow()
});

module.exports = {
    createCourseSchema,
    createEpisodeSchema
}
const { validationError } = require('../../../utils/fuctions');
const {mongoIdPattern} = require('../../../utils/costans');
const httpError = require('http-errors');
const joi = require('@hapi/joi');

const createProductSchema = joi.object({
    title : joi.string().min(3).max(30).error(httpError.BadRequest(validationError("title"))),
    text : joi.string().error(httpError.BadRequest(validationError("text"))),
    short_text : joi.string().error(httpError.BadRequest(validationError("short_text"))),
    tags : joi.array().min(0).max(20).error(httpError.BadRequest(validationError("tags"))),
    colors : joi.array().items(joi.string()).min(0).max(20).error(httpError.BadRequest(validationError("color"))),
    category : joi.string().regex(mongoIdPattern).error(httpError.BadRequest(validationError("category ID"))),
    price : joi.number().error(httpError.BadRequest(validationError("price"))),
    discount : joi.number().error(httpError.BadRequest(validationError("discount"))),
    count : joi.number().error(httpError.BadRequest(validationError("count"))),
    weight : joi.number().allow(null, 0, "0").error(httpError.BadRequest(validationError("weight"))),
    height : joi.number().allow(null, 0, "0").error(httpError.BadRequest(validationError("height"))),
    width : joi.number().allow(null, 0, "0").error(httpError.BadRequest(validationError("width"))),
    lenght : joi.number().allow(null, 0, "0").error(httpError.BadRequest(validationError("length"))),
    type : joi.string().regex(/(virtual|physical)/i),
    filename : joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(httpError.BadRequest(validationError("file format"))),
    fileUploadPath : joi.allow()
});

module.exports = {
    createProductSchema
}
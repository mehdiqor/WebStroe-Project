const { validationError } = require('../../../utils/fuctions');
const httpError = require('http-errors');
const joi = require('@hapi/joi');

const addRoomSchema = joi.object({
    name : joi.string().min(3).max(30).error(httpError.BadRequest(validationError('name'))),
    description : joi.string().min(5).max(30).error(httpError.BadRequest(validationError("description"))),
    namespace : joi.string().min(5).max(30).error(httpError.BadRequest(validationError("namespace"))),
    filename : joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(httpError.BadRequest(validationError('file format'))),
    fileUploadPath : joi.allow()
});

module.exports = {
    addRoomSchema
}
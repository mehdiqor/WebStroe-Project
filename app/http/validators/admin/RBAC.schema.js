const { validationError } = require('../../../utils/fuctions');
const { mongoIdPattern } = require('../../../utils/costans');
const httpError = require('http-errors');
const joi = require('@hapi/joi');

const addRoleSchema = joi.object({
    title : joi.string().min(3).max(30).error(httpError.BadRequest(validationError("title"))),
    description : joi.string().min(0).max(100).error(httpError.BadRequest(validationError("description"))),
    permissions : joi.array().items(joi.string().pattern(mongoIdPattern)).allow("").error(httpError.BadRequest(validationError("permissions ID")))
});
const addPermissionSchema = joi.object({
    name : joi.string().min(3).max(30).error(httpError.BadRequest(validationError("name"))),
    description : joi.string().min(0).max(100).error(httpError.BadRequest(validationError("description")))
});

module.exports = {
    addRoleSchema,
    addPermissionSchema
}
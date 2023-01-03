const { mongoIdPattern, validationError } = require('../../../utils/costans');
const httpError = require('http-errors');
const joi = require('@hapi/joi');

const addCategorySchema = joi.object({
    title : joi.string().min(3).max(30).error(httpError.BadRequest(validationError("title"))),
    parent : joi.string().allow('').pattern(mongoIdPattern).allow('').error(httpError.BadRequest(validationError('parentID')))
});
const updateCategorySchema = joi.object({
    title : joi.string().min(3).max(30).error(httpError.BadRequest(validationError('title')))
});

module.exports = {
    addCategorySchema,
    updateCategorySchema
}
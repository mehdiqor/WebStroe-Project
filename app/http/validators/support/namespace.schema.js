const { validationError } = require('../../../utils/fuctions');
const httpError = require('http-errors');
const joi = require('@hapi/joi');

const addNamespaceSchema = joi.object({
    title : joi.string().min(3).max(30).error(httpError.BadRequest(validationError("title"))),
    endpoint : joi.string().min(3).max(30).error(httpError.BadRequest(validationError('endpoint')))
});

module.exports = {
    addNamespaceSchema
}
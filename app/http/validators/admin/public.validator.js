const { validationError } = require('../../../utils/fuctions');
const { mongoIdPattern } = require('../../../utils/costans');
const httpError = require('http-errors');
const joi = require('@hapi/joi');

const ObjectIdValidator = joi.object({
    id : joi.string().pattern(mongoIdPattern).error(httpError.BadRequest(validationError("ID")))
});

module.exports = {
    ObjectIdValidator
}
const { phoneNumberPattern } = require('../../../utils/costans');
const { validationError } = require('../../../utils/fuctions');
const httpError = require('http-errors');
const joi = require('@hapi/joi');

const getOtpSchema = joi.object({
    phone : joi.string().length(11).pattern(phoneNumberPattern).error(httpError.BadRequest(validationError("phone number")))
});
const checkOtpSchema = joi.object({
    phone : joi.string().length(11).pattern(phoneNumberPattern).error(httpError.BadRequest(validationError("phone number"))),
    code : joi.string().min(4).max(6).error(httpError.BadRequest(validationError("OTP code")))
});

module.exports = {
    getOtpSchema,
    checkOtpSchema
}
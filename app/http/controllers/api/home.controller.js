const { authSchema } = require("../../validators/user/auth.schema");
const { StatusCodes : httpStatus } = require('http-status-codes');
const Controller = require("../controller");
const createError = require('http-errors');

module.exports = new class HomeController extends Controller{
    async indexPage(req, res, next){
        try {
            return res.status(httpStatus.OK).send("Index page store!")
        } catch (error) {
            next(error)
        }
    }
}
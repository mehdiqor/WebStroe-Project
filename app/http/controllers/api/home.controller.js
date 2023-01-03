const { StatusCodes : httpStatus } = require('http-status-codes');
const Controller = require("../controller");

module.exports = new class HomeController extends Controller{
    async indexPage(req, res, next){
        try {
            return res.status(httpStatus.OK).send("Index page of the store!")
        } catch (error) {
            next(error)
        }
    }
}
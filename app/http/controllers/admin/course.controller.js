const { CourseModel } = require("../../../models/course");
const Controller = require("../controller");
const createError = require("http-errors");
const { StatusCodes : httpStatus } = require("http-status-codes");
const course = require("../../../models/course");

class CorseController extends Controller {
    async getListOfProduct(req, res, next){
        try {
            const {search} = req.query;
            let courses;
            if(search) courses = await CourseModel.find({
                $text : {
                    $search : search
                }
            })
            .sort({ _id : -1 })
            else courses = await CourseModel.find({})
            .sort({ _id : -1 })
            
            res.status(httpStatus.OK).json({
                data : {
                    statusCode : httpStatus.OK,
                    courses
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    CorseController : new CorseController()
}
const { StatusCodes : httpStatus } = require("http-status-codes");
const { CourseModel } = require("../../../models/course");
const Controller = require("../controller");
const createError = require("http-errors");
const path = require("path");

class CourseController extends Controller {
    async addCourse(req, res, next){
        try {
            const {fileUploadPath, filename} = req.body;
            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/")
            const {title, short_text, text, tags, category, price, discount} = req.body;
            return res.status(httpStatus.CREATED).json({title, short_text, text, tags, category, price, discount, image})
        } catch (error) {
            next(error)
        }
    }
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
    CourseController : new CourseController()
}
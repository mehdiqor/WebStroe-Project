const { StatusCodes : httpStatus } = require("http-status-codes");
const { CourseModel } = require("../../../models/course");
const Controller = require("../controller");
const createError = require("http-errors");
const path = require("path");
const { createCourseSchema } = require("../../validators/admin/course.schema");
const { ObjectIdValidator } = require("../../validators/admin/public.validator");

class CourseController extends Controller {
    async addCourse(req, res, next){
        try {
            await createCourseSchema.validateAsync(req.body);
            const {fileUploadPath, filename} = req.body;
            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
            const {title, short_text, text, tags, category, price, discount, type, status} = req.body;
            const teacher = req.user._id;
            if(Number(price) > 0 && type == "free") throw createError.BadRequest("برای دوره رایگان نمیتوان قیمت ثبت کرد")
            const course = await CourseModel.create({
                title,
                short_text,
                text,
                tags,
                category,
                price,
                discount,
                type,
                status,
                image,
                teacher,
                time : "00:00:00"
            });
            if(!course?._id) throw createError.InternalServerError("دوره ثبت نشد")
            return res.status(httpStatus.CREATED).json({
                statusCode : httpStatus.CREATED,
                data : {
                    message : "دوره با موفقیت ایجاد شد"
                }
            });
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
                statusCode : httpStatus.OK,
                data : {
                    courses
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getCourseByID(req, res, next){
        try {
            const { id } = req.params;
            const course = await this.findcourseByID(id);
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    course
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findcourseByID(CourseID) {
        const { id } = await ObjectIdValidator.validateAsync({ id: CourseID });
        const course = await CourseModel.findById(id);
        if (!course) throw createError.NotFound("دوره ای یافت نشد");
        return course;
    }
}

module.exports = {
    CourseController : new CourseController()
}
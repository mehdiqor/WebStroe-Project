const { deleteInvalidPropertyInObject, deleteFileInPublic, copyObject, getTimeOfCourseByChapter } = require("../../../../utils/fuctions");
const { ObjectIdValidator } = require("../../../validators/admin/public.validator");
const { createCourseSchema } = require("../../../validators/admin/course.schema");
const { StatusCodes : httpStatus } = require("http-status-codes");
const { CourseModel } = require("../../../../models/course");
const Controller = require("../../controller");
const createError = require("http-errors");
const path = require("path");

class CourseController extends Controller {
    async addCourse(req, res, next){
        try {
            await createCourseSchema.validateAsync(req.body);
            const {fileUploadPath, filename} = req.body;
            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
            let {title, short_text, text, tags, category, price, discount, type, status} = req.body;
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
                teacher
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
    async editCourse(req, res, next){
        try {
            const {id} = req.params;
            const course = await this.findCourseByID(id);
            const data = copyObject(req.body);
            const {filename, fileUploadPath} = req.body;
            let BlackList = ["time", "chapters", "episodes", "students", "bookmarks", "likes", "dislikes", "comments", "fileUploadPath", "filename"];
            deleteInvalidPropertyInObject(data, BlackList);
            if(req.file){
                data.image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
                deleteFileInPublic(course.image)
            }
            const updateCourseResuly = await CourseModel.updateOne(
                {
                    _id : id
                },
                {
                    $set : data
                }
            );
            if(!updateCourseResuly.modifiedCount) throw createError.InternalServerError("بروزرسانی دوره انجام نشد");
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    message : "بروزرسانی دوره با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfCourses(req, res, next){
        try {
            const {search} = req.query;
            let courses;
            if(search) courses = await CourseModel
            .find({
                $text : {
                    $search : search
                }
            })
            .populate([
                {
                    path : "category",
                    select : {
                        children : 0,
                        parent : 0,
                        __v : 0
                    }
                },
                {
                    path : "teacher",
                    select : {
                        first_name : 1,
                        last_name : 1,
                        phone : 1,
                        email : 1
                    }
                }
            ])
            .sort({
                _id : -1
            });
            else courses = await CourseModel
            .find({})
            .populate([
                {
                    path : "category",
                    select : {
                        children : 0,
                        parent : 0,
                        __v : 0
                    }
                },
                {
                    path : "teacher",
                    select : {
                        first_name : 1,
                        last_name : 1,
                        phone : 1,
                        email : 1
                    }
                }
            ])
            .sort({
                _id : -1
            });
            res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    courses
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async getCourseByID(req, res, next){
        try {
            const {id} = req.params;
            const course = await this.findCourseByID(id);
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
    async findCourseByID(CourseID) {
        const { id } = await ObjectIdValidator.validateAsync({ id: CourseID });
        const course = await CourseModel.findById(id);
        if (!course) throw createError.NotFound("دوره ای یافت نشد");
        return course;
    }
}

module.exports = {
    AbstractCourseController : CourseController,
    CourseController : new CourseController()
}
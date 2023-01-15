const { deleteInvalidPropertyInObject, deleteFileInPublic, copyObject, notFoundMessage } = require("../../../../utils/fuctions");
const { ObjectIdValidator } = require("../../../validators/admin/public.validator");
const { createCourseSchema } = require("../../../validators/admin/course.schema");
const { PROCCESS_MASSAGES } = require("../../../../utils/costans");
const { StatusCodes : httpStatus } = require("http-status-codes");
const { CourseModel } = require("../../../../models/course");
const Controller = require("../../controller");
const httpError = require("http-errors");
const path = require("path");

class CourseController extends Controller {
    async createCourse(req, res, next){
        try {
            await createCourseSchema.validateAsync(req.body);
            const {fileUploadPath, filename} = req.body;
            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
            let {title, short_text, text, tags, category, price, discount, type, status} = req.body;
            const teacher = req.user._id;
            if(Number(price) > 0 && type == "free") throw httpError.BadRequest(PROCCESS_MASSAGES.FREE_COURSES)
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
            if(!course?._id) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_CAREATED)
            return res.status(httpStatus.CREATED).json({
                statusCode : httpStatus.CREATED,
                data : {
                    message : PROCCESS_MASSAGES.CAREATED
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async updateCourse(req, res, next){
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
            if(!updateCourseResuly.modifiedCount) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_UPDATED);
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    message : PROCCESS_MASSAGES.UPDATED
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllCourses(req, res, next){
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
        if (!course) throw httpError.NotFound(notFoundMessage("course"));
        return course;
    }
}

module.exports = {
    AbstractCourseController : CourseController,
    CourseController : new CourseController()
}
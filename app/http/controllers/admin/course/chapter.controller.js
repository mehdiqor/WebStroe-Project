const { AbstractCourseController } = require("./course.controller");
const { StatusCodes : httpStatus } = require("http-status-codes");
const { CourseModel } = require("../../../../models/course");
const createError = require("http-errors");

class ChapterController extends AbstractCourseController {
    async addChapter(req, res, next){
        try {
            const {id, title, text} = req.body;
            await this.findCourseByID(id);
            const saveChapterResult = await CourseModel.updateOne(
                {
                    _id : id
                },
                {
                    $push : {
                        chapters : {
                            title,
                            text,
                            episodes : []
                        }
                    }
                }
            );
            if(saveChapterResult.modifiedCount == 0) throw createError.InternalServerError("فصل افزوده نشد");
            return res.status(httpStatus.CREATED).json({
                statusCode : httpStatus.CREATED,
                data : {
                    message : "فصل با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async ListOfChapters(req, res, next){
        try {
            const {courseID} = req.params;
            const course = await this.getChapterOfCourse(courseID)
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
    async getChapterOfCourse(id){
        const chapter = await CourseModel.findOne({_id : id}, {chapters : 1, title : 1});
        if(!chapter) throw createError.NotFound("دوره مورد نظر یافت نشد")
        return chapter
    }
}

module.exports = {
    ChapterController : new ChapterController()
}
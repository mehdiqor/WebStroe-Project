const { AbstractCourseController } = require("./course.controller");
const { StatusCodes : httpStatus } = require("http-status-codes");
const { CourseModel } = require("../../../../models/course");
const httpError = require("http-errors");
const { deleteInvalidPropertyInObject } = require("../../../../utils/fuctions");

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
            if(saveChapterResult.modifiedCount == 0) throw httpError.InternalServerError("فصل افزوده نشد");
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
    async editChapterByID(req, res, next){
        try {
            const {chapterID} = req.params;
            await this.getOneChapter(chapterID);
            const data = req.body;
            const BlackList = ["bookmarks", "likes", "dislikes", "comments", "supplier", "length", "width", "height", "weight"];
            deleteInvalidPropertyInObject(data, BlackList);
            const updateChapterResult = await CourseModel.updateOne(
                {
                    "chapters._id" : chapterID
                },
                {
                    $set : {
                        "chapters.$" : data
                    }
                }
            )
            if(updateChapterResult.modifiedCount == 0) throw httpError.InternalServerError("بروزرسانی فصل انجام نشد");
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    message : "بروزرسانی با موفقیت انجام شد"
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
    async removeChapterByID(req, res, next){
        try {
            const {chapterID} = req.params;
            const chapter = await this.getOneChapter(chapterID);
            const removeChapterResult = await CourseModel.updateOne(
                {
                    "chapters._id" : chapterID
                },
                {
                    $pull : {
                        chapters : {
                            _id : chapterID
                        }
                    }
                }
            );
            if(removeChapterResult.modifiedCount == 0) throw httpError.InternalServerError("حذف فصل انجام نشد");
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    message : "حذف فصل با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getChapterOfCourse(id){
        const chapter = await CourseModel.findOne({_id : id}, {chapters : 1, title : 1});
        if(!chapter) throw httpError.NotFound("دوره مورد نظر یافت نشد")
        return chapter
    }
    async getOneChapter(id){
        const chapter = await CourseModel.findOne({"chapters._id" : id}, {"chapter.$" : 1});
        if(!chapter) throw httpError.NotFound("فصلی با این شناسه یافت نشد");
        return chapter
    }
}

module.exports = {
    ChapterController : new ChapterController()
}
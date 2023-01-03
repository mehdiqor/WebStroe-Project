const { deleteInvalidPropertyInObject } = require("../../../../utils/fuctions");
const { AbstractCourseController } = require("./course.controller");
const { PROCCESS_MASSAGES } = require("../../../../utils/costans");
const { StatusCodes : httpStatus } = require("http-status-codes");
const { CourseModel } = require("../../../../models/course");
const httpError = require("http-errors");

class ChapterController extends AbstractCourseController {
    async createChapter(req, res, next){
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
            if(saveChapterResult.modifiedCount == 0) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_CAREATED);
            return res.status(httpStatus.CREATED).json({
                statusCode : httpStatus.CREATED,
                data : {
                    message : PROCCESS_MASSAGES.CAREATED
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateChapter(req, res, next){
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
            if(updateChapterResult.modifiedCount == 0) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_UPDATED);
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
    async getAllChapters(req, res, next){
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
    async deleteChapter(req, res, next){
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
            if(removeChapterResult.modifiedCount == 0) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_DELETED);
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    message : PROCCESS_MASSAGES.DELETED
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
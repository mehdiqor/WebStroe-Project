const { getTime, deleteInvalidPropertyInObject, copyObject } = require("../../../../utils/fuctions");
const { ObjectIdValidator } = require("../../../validators/admin/public.validator");
const { createEpisodeSchema } = require("../../../validators/admin/course.schema");
const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { StatusCodes : httpStatus } = require("http-status-codes");
const { CourseModel } = require("../../../../models/course");
const Controller = require("../../controller");
const HttpError = require("http-errors");
const path = require("path");

class EpisodeController extends Controller {
    async addEpisode(req, res, next){
        try {
            const {title, text, type, courseID, chapterID, fileUploadPath, filename} = await createEpisodeSchema.validateAsync(req.body);
            const fileAddress = path.join(fileUploadPath, filename)
            const videoAddress = fileAddress.replace(/\\/g, "/");
            const videoUrl = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
            const seconds = await getVideoDurationInSeconds(videoUrl);
            const time = getTime(seconds);
            const episode = {title, text, type, time, videoAddress}
            const createEpisodeResult = await CourseModel.updateOne(
                {
                    _id : courseID,
                    "chapters._id" : chapterID
                },
                {
                    $push : {
                        "chapters.$.episodes" : episode
                    }
                }
            )
            if(createEpisodeResult.modifiedCount == 0) throw HttpError.InternalServerError("افزودن اپیزود انجام نشد");
            return res.status(httpStatus.CREATED).json({
                statusCode : httpStatus.CREATED,
                data : {
                    message : "اپیزود با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async editEpisode(req, res, next){
        try {
            const {episodeID} = req.params;
            const episode = await this.getOneEpisod(episodeID);
            const {fileUploadPath, filename} = req.body;
            let BlackList = ["_id"];
            if(fileUploadPath && filename){
                const fileAddress = path.join(fileUploadPath, filename)
                req.body.videoAddress = fileAddress.replace(/\\/g, "/");
                const videoUrl = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${req.body.videoAddress}`;
                const seconds = await getVideoDurationInSeconds(videoUrl);
                req.body.time = getTime(seconds);
                BlackList.push("filename")
                BlackList.push("fileUploadPath")
            }else {
                BlackList.push("time")
                BlackList.push("videoAddress")
            }
            const data = req.body;
            deleteInvalidPropertyInObject(data, BlackList)
            const newEpisode = {
                ...episode,
                ...data
            }
            console.log(newEpisode);
            const editEpisodeResult = await CourseModel.updateOne(
                {
                    "chapters.episodes._id" : episodeID
                },
                {
                    $set : {
                        "chapters.$.episodes" : newEpisode
                    }
                }
            )
            if(!editEpisodeResult.modifiedCount)
                throw HttpError.InternalServerError("ویرایش اپیزود انجام نشد");
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    message : "اپیزود با موفقیت ویرایش شد"
                }
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    async removeEpisode(req, res, next){
        try {
            const {id : episodeID} = await ObjectIdValidator.validateAsync({id : req.params.episodeID});
            const removeEpisodeResult = await CourseModel.updateOne(
                {
                    "chapters.episodes._id" : episodeID
                },
                {
                    $pull : {
                        "chapters.$.episodes" : {
                            _id : episodeID
                        }
                    }
                }
            )
            if(removeEpisodeResult.modifiedCount == 0) throw HttpError.InternalServerError("حذف اپیزود انجام نشد");
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    message : "اپیزود با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getOneEpisod(episodeID){
        const course = await CourseModel.findOne(
            {
                "chapters.episodes._id" : episodeID
            }
        )
        if(!course) throw HttpError.NotFound("اپیزودی یافت نشد");
        const episode = await course?.chapters?.[0]?.episodes?.[0]
        if(!episode) throw HttpError.NotFound("اپیزودی یافت نشد");
        return copyObject(episode)
    }
}

module.exports = {
    EpisodeController : new EpisodeController()
}
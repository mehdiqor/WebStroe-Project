const { addRoomSchema } = require("../../validators/support/room.schema");
const { ConversationModel } = require("../../../models/conversation");
const { StatusCodes : httpstatus } = require("http-status-codes");
const { PROCCESS_MASSAGES } = require("../../../utils/costans");
const { notFoundMessage } = require("../../../utils/fuctions");
const Controller = require("../controller");
const httpError = require("http-errors");
const path = require("path");

class RoomController extends Controller{
    async createRoom(req, res, next){
        try {
            await addRoomSchema.validateAsync(req.body);
            const {name, description, namespace, filename, fileUploadPath} = req.body;
            await this.findConversationWithEndpoint(namespace);
            await this.findRoomWithName(name);
            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
            const room = {name, description, image};
            const conversation = await ConversationModel.updateOne(
                {endpoint : namespace},
                {
                    $push : {
                        rooms : room
                    }
                }
            );
            if(!conversation.modifiedCount) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_CAREATED)
            return res.status(httpstatus.CREATED).json({
                statusCode : httpstatus.CREATED,
                data : {
                    message : PROCCESS_MASSAGES.CAREATED
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllRooms(req, res, next){
        try {
            const conversation = await ConversationModel.find({}, {rooms : 1});
            return res.status(httpstatus.OK).json({
                statusCode : httpstatus.OK,
                data : {
                    rooms : conversation
                }
            }) 
        } catch (error) {
            next(error)
        }
    }
    async findRoomWithName(name){
        const rooms = await ConversationModel.findOne({"rooms.name" : name});
        if(rooms) throw httpError.BadRequest(PROCCESS_MASSAGES.EXIST_NAME);
    }
    async findConversationWithEndpoint(endpoint){
       const conversation = await ConversationModel.findOne({endpoint});
       if(!conversation) throw httpError.BadRequest(notFoundMessage("conversation"));
       return conversation
    }
}

module.exports = {
    RoomController : new RoomController()
}
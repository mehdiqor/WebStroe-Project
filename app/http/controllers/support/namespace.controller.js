const { addNamespaceSchema } = require("../../validators/support/namespace.schema");
const { ConversationModel } = require("../../../models/conversation");
const { StatusCodes : httpstatus } = require("http-status-codes");
const { PROCCESS_MASSAGES } = require("../../../utils/costans");
const Controller = require("../controller");
const httpError = require("http-errors");

class NamespaceController extends Controller{
 async createNamespace(req, res, next){
    try {
        await addNamespaceSchema.validateAsync(req.body);
        const {title, endpoint} = req.body;
        await this.findNamespaceWithEndpoint(endpoint);
        const conversation = await ConversationModel.create({title, endpoint});
        if(!conversation) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_CAREATED);
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
 async getAllNamespaces(req, res, next){
    try {
        const namespaces = await ConversationModel.find({}, {rooms : 0});
        return res.status(httpstatus.OK).json({
            statusCode : httpstatus.OK,
            data : {
                namespaces
            }
        })
    } catch (error) {
        next(error)
    }
 }
 async findNamespaceWithEndpoint(endpoint){
    const conversation = await ConversationModel.findOne({endpoint});
    if(conversation) throw httpError.BadRequest(PROCCESS_MASSAGES.EXIST_NAME);
 }
}

module.exports = {
    NamespaceController : new NamespaceController()
}
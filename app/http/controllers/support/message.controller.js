const Controller = require("../controller");
const { StatusCodes : httpstatus } = require("http-status-codes");

class MessageController extends Controller{
    async createMessage(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async getAllMessages(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    MessageController : new MessageController()
}
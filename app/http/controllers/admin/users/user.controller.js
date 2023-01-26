const { deleteInvalidPropertyInObject } = require("../../../../utils/fuctions");
const { PROCCESS_MASSAGES } = require("../../../../utils/costans");
const { StatusCodes : httpStatus } = require("http-status-codes");
const { UserModel } = require("../../../../models/users");
const Controller = require("../../controller");
const httpError = require("http-errors");

class UserController extends Controller{
    async updateUserProfile(req, res, next){
        try {
            const userID = req.user._id;
            const data = req.body;
            const blackList = ["phone", "otp", "bills", "dsicount", "roles", "courses"];
            deleteInvalidPropertyInObject(data, blackList);
            const profileUpdateResult = await UserModel.updateOne(
                {
                    _id : userID
                },
                {
                    $set : data
                }
            );
            if(!profileUpdateResult.modifiedCount) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_UPDATED)
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
    async UserProfile(req, res, next){
        try {
            const user = req.user;
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    user
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllUsers(req, res, next){
        try {
            const {search} = req.query;
            const dataBaseQuery = {};
            if(search) dataBaseQuery['$text'] = {$search : search}
            const users = await UserModel.find(dataBaseQuery);
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    users
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    UserController : new UserController()
}
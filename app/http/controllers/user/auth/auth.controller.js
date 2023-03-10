const { randomNumberGenerator, signAccessToken, verifyRefreshToken, signRefreshToken } = require('../../../../utils/fuctions');
const { getOtpSchema, checkOtpSchema } = require('../../../validators/user/auth.schema');
const { ROLES, NULLISH_DATA, PROCCESS_MASSAGES } = require('../../../../utils/costans');
const { StatusCodes : httpStatus } = require('http-status-codes');
const { UserModel } = require('../../../../models/users');
const Controller = require('../../controller');
const httpError = require('http-errors');

class UserAuthController extends Controller {
    async getOtp(req, res, next){
        try {
            await getOtpSchema.validateAsync(req.body);
            const {phone} = req.body;
            const code = randomNumberGenerator();
            const result = await this.saveUser(phone, code);
            if(!result) throw httpError.Unauthorized(PROCCESS_MASSAGES.NO_LOGIN)
            return res.status(httpStatus.OK).send({
                statusCode : httpStatus.OK,
                data : {
                    message: PROCCESS_MASSAGES.OTP,
                    code,
                    phone
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkOtp(req, res, next){
        try {
            await checkOtpSchema.validateAsync(req.body);
            const {phone , code} = req.body;
            const user = await UserModel.findOne({ phone });
            if(!user) throw httpError.NotFound(PROCCESS_MASSAGES.NO_USER);
            if(user.otp.code != code) throw httpError.Unauthorized(PROCCESS_MASSAGES.INVALID_OTP);
            const now = Date.now();
            if(+user.otp.expiresIn < now) throw httpError.Unauthorized(PROCCESS_MASSAGES.EXPIRED_OTP);
            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    accessToken,
                    refreshToken
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async refreshToken(req, res, next){
        try {
            const {refreshToken} = req.body;
            const phone = await verifyRefreshToken(refreshToken);
            const user = await UserModel.findOne({phone});
            const accessToken = await signAccessToken(user._id);
            const newRefreshToken = await signRefreshToken(user._id);
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    accessToken,
                    refreshToken : newRefreshToken
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async saveUser(phone, code){
        let otp = {
            code,
            expiresIn : (new Date().getTime() + 120000)
        }
        const result = await this.checkExistUser(phone);
        if(result){
            return (await this.updateUser(phone, {otp}))
        }
        return !!(await UserModel.create({
            phone,
            otp,
            Role : ROLES.USER
        }))
    }
    async checkExistUser(phone){
        const user = await UserModel.findOne({phone});
        return !! user
        //return true or false
    }
    async updateUser(phone, objectData = {}){
        Object.keys(objectData).forEach(key => {
            let nullData = Object.values(NULLISH_DATA);
            if(nullData) delete objectData[key];
        })
        const updateResult = await UserModel.updateOne({phone}, {$set : objectData});
        return !!updateResult.modifiedCount
    }
}

module.exports = {
    UserAuthController : new UserAuthController()
}
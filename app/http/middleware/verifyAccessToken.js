const { ACCESS_TOKEN_SECRET_KEY, PROCCESS_MASSAGES } = require('../../utils/costans');
const { UserModel } = require('../../models/users');
const httpError = require('http-errors');
const jwt = require('jsonwebtoken');

function getToken(headers){
    const [bearer, token] = headers?.authorization?.split(" ") || [];
    if(token && ["bearer", "Bearer"].includes(bearer)) return token;
    throw httpError.Unauthorized(PROCCESS_MASSAGES.NO_USER + "! " + PROCCESS_MASSAGES.LOGIN);
}
function verifyAccessToken(req, res, next){
    try {
        const token = getToken(req.headers)
        jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async(err, payload) => {
            try {
                if(err) throw httpError.Unauthorized(PROCCESS_MASSAGES.LOGIN);
                const {phone} = payload || {};
                const user = await UserModel.findOne({phone}, {password : 0, otp : 0});
                if(!user) throw httpError.Unauthorized(PROCCESS_MASSAGES.NO_USER);
                req.user = user
                return next();
            } catch (error) {
                next(error)
            }
        })
    } catch (error) {
        next(error)
    }
}
async function verifyAccessTokenInGraphql(req){
    try {
        const token = getToken(req.headers);
        const {phone} = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
        const user = await UserModel.findOne({phone});
        if(!user) throw httpError.Unauthorized(PROCCESS_MASSAGES.NO_USER);
        return user
    } catch (error) {
        throw httpError.Unauthorized(error)
    }
}

module.exports = {
    verifyAccessToken,
    verifyAccessTokenInGraphql
}
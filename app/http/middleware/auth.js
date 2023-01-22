const { UserModel } = require("../../models/users");
const { PROCCESS_MASSAGES } = require("../../utils/costans");

async function checkLogin(req, res, next){
    try {
        const token = req.signedCookies["authorization"]
        if(token){
            const user = await UserModel.findOne({token},
                {basket : 0, password : 0, products : 0, courses : 0}
            );
            if(user){
                req.user = user;
                return next()
            }
        }
        return res.render("login.ejs", {
            error : PROCCESS_MASSAGES.LOGIN
        })
    } catch (error) {
        next(error)
    }
}
async function checkAccessLogin(req, res, next){
    try {
        const token = req.signedCookies["authorization"]
        if(token){
            const user = await UserModel.findOne({token},
                {basket : 0, password : 0, products : 0, courses : 0}
            );
            if(user){
                req.user = user;
                return res.redirect("/support")
            }
        }
        return next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    checkLogin,
    checkAccessLogin
}
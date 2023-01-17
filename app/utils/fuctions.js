const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY, NULLISH_DATA, PROCCESS_MASSAGES } = require('./costans');
const { UserModel } = require('../models/users');
const redisClient = require('./init_redis');
const httpError = require('http-errors');
const moment = require('moment-jalali');
const jwt = require('jsonwebtoken');
const path = require("path");
const fs = require('fs');

function randomNumberGenerator(){
    return Math.floor((Math.random() * 90000) + 10000)
}
function signAccessToken(userId){
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            phone : user.phone
        };
        const options = {
            expiresIn : "30 days"
        };
        jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
            if(err) reject(httpError.InternalServerError());
            resolve(token)
        })
    })
}
function signRefreshToken(userId){
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            phone : user.phone
        };
        const options = {
            expiresIn : "1y"
        };
        jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, async (err, token) => {
            if(err) reject(httpError.InternalServerError());
            await redisClient.SETEX(String(userId), (365 * 24 * 60 * 60), token)
            resolve(token)
        })
    })
}
function verifyRefreshToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            if(err) reject(httpError.Unauthorized(PROCCESS_MASSAGES.LOGIN));
            const {phone} = payload || {};
            const user = await UserModel.findOne({phone}, {password : 0, otp : 0});
            if(!user) reject(httpError.Unauthorized(PROCCESS_MASSAGES.NO_USER));
            const refreshToken = redisClient.get(user?._id || "key_default");
            if(!refreshToken) reject(httpError.Unauthorized(PROCCESS_MASSAGES.NO_LOGIN));
            console.log(refreshToken);
            if(token === refreshToken) return resolve(phone);
            reject(httpError.Unauthorized(PROCCESS_MASSAGES.NO_LOGIN));
        })
    })
}
function deleteFileInPublic(fileAddress){
    if(fileAddress){
        const pathFile = path.join(__dirname, "..", "..", "public", fileAddress)
        if(fs.existsSync(pathFile)) fs.unlinkSync(pathFile)
    }
}
function listOfImagesFromRequest(files, fileUploadPath){
    if(files?.length > 0){
        return (
            (files.map(file => path.join(fileUploadPath, file.filename)))
            .map(item => item.replace(/\\/g, "/"))
        )
    }
    else{
        return []
    }
}
function copyObject(object){
    return JSON.parse(JSON.stringify(object))
}
function setFeatures(body){
    const {colors, width, length, height, weight} = body;
    let features = {};
    features.colors = colors;
    if ( !isNaN(+width) || !isNaN(+weight) || !isNaN(+length) || !isNaN(+height)) {
      if (!width) features.width = 0;
      else features.width = +width;
      if (!length) features.length = 0;
      else features.length = +length;
      if (!height) features.height = 0;
      else features.height = +height;
      if (!weight) features.weight = 0;
      else features.weight = +weight;
    }
    return features
}
function deleteInvalidPropertyInObject(data = {}, BlackList = []){
    let nullData = Object.values(NULLISH_DATA);
    Object.keys(data).forEach(key => {
        if (BlackList.includes(key)) delete data[key];
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());
        if (Array.isArray(data[key]) && data[key].length == 0) delete data[key]
        if (nullData.includes(data[key])) delete data[key];
    });
}
function getTime(seconds) {
    let total = Math.round(seconds) / 60;
    let [minutes, percent] = String(total).split(".");
    let second = Math.round((percent * 60) / 100).toString().substring(0, 2);
    let hour = 0;
    if (minutes > 60) {
        total = minutes / 60
         let [h1, percent] = String(total).split(".");
         hour = h1,
         minutes = Math.round((percent * 60) / 100).toString().substring(0, 2);
    }
    if(String(hour).length == 1) hour = `0${hour}`
    if(String(minutes).length == 1) minutes = `0${minutes}`
    if(String(second).length == 1) second = `0${second}`
    return (hour + ":" + minutes + ":" + second)
}
function getTimeOfCourseByChapter(chapters = []){
    let time, hour, minute, second = 0;
    for (const chapter of chapters) {
        if(Array.isArray(chapter?.episodes)){
            for (const episode of chapter.episodes) {
                if(episode?.time) time = episode.time.split(":"); //[joure, minute, secod]
                else time = "00:00:00".split(":");
                if(time.length == 3){ //01:12:34
                    second += Number(time[0]) * 3600 //convert hour to seconds
                    second += Number(time[1]) * 60 //convert minuteto seconds
                    second += Number(time[2]) //sum seconds with seconds
                }else if(time.length == 2){ //05:34
                    second += Number(time[0]) * 60 //convert minuteto seconds
                    second += Number(time[1]) //sum seconds with seconds
                }
            }
        }
    }
    hour = Math.floor(second / 3600); //convert seconds to hours
    minute = Math.floor(second / 60) % 60; //convert seconds to minutes
    second = Math.floor(second % 60); //convert seconds to seconds
    if(String(hour).length == 1) hour = `0${hour}`
    if(String(minute).length == 1) minute = `0${minute}`
    if(String(second).length == 1) second = `0${second}`
    return (hour + ":" + minute + ":" + second)
}
function validationError(title){
    return `${title} is not VALID! please try again`
}
function notFoundMessage(title){
    return `Oops!... ${title} NOT FOUND!`
}
async function getBasketOfUser(userID){
    const userDetails = await UserModel.aggregate([
        {
            $match : {_id : userID}
        },
        {
            $project : {basket : 1}
        },
        {
            $lookup : {
                from : "products",
                localField : "basket.products.productID",
                foreignField : "_id",
                as : "productDetail"
            }
        },
        {
            $lookup : {
                from : "courses",
                localField : "basket.courses.courseID",
                foreignField : "_id",
                as : "courseDetail"
            }
        },
        {
            $addFields : {
                "productDetail" : {
                    $function : {
                        body : function(productDetail, products){
                            return productDetail.map(function(product){
                                const productCount = products.find(item => item.productID.valueOf() == product._id.valueOf()).count;
                                const totalPrice = productCount * product.price;
                                return {
                                    ...product,
                                    basketCount : productCount,
                                    totalPrice,
                                    finalPrice : totalPrice - ((product.discount / 100) * totalPrice)
                                }
                            })
                        },
                        args : ["$productDetail", "$basket.products"],
                        lang : "js"
                    }
                },
                "courseDetail" : {
                    $function : {
                        body : function(courseDetail){
                            return courseDetail.map(function(course){
                                return {
                                    ...course,
                                    finalPrice : course.price - ((course.discount / 100) * course.price)
                                }
                            })
                        },
                        args : ["$courseDetail"],
                        lang : "js"
                    }
                },
                "payDetail" : {
                    $function : {
                        body : function(courseDetail, productDetail, products){
                            const courseAmount = courseDetail.reduce(function(total, course){
                                return total + (course.price - ((course.discount / 100) * course.price))
                            }, 0)
                            const productAmount = productDetail.reduce(function(total, product){
                                const productCount = products.find(item => item.productID.valueOf() == product._id.valueOf()).count
                                const totalPrice = productCount * product.price
                                return total + (totalPrice - ((product.discount / 100) * totalPrice))
                            }, 0)
                            const courseIds = courseDetail.map(course => course._id.valueOf())
                            const productIds = productDetail.map(product => product._id.valueOf())
                            return {
                                courseAmount,
                                productAmount,
                                paymentAmount : courseAmount + productAmount,
                                courseIds,
                                productIds
                            }
                        },
                        args : ["$courseDetail", "$productDetail", "$basket.products"],
                        lang : "js"
                    }
                }
            }
        },
        {
            $project : {
                basket : 0
            }
        }
    ]);
    console.log(userDetails);
    return copyObject(userDetails)
}
function invoiceNumberGenerator(){
    return moment().format("jYYYYjMMjDDHHmmssSSS") + String(process.hrtime()[1]).padStart(9, 0)
}

module.exports = {
    randomNumberGenerator,
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    deleteFileInPublic,
    listOfImagesFromRequest,
    copyObject,
    setFeatures,
    deleteInvalidPropertyInObject,
    getTime,
    getTimeOfCourseByChapter,
    validationError,
    notFoundMessage,
    getBasketOfUser,
    invoiceNumberGenerator
}
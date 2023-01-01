const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY, BlackList, nullishData } = require('./costans');
const { UserModel } = require('../models/users');
const redisClient = require('./init_redis');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const path = require("path");
const fs = require('fs');
const { isArray } = require('util');

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
            if(err) reject(createError.InternalServerError("خطای سرور!"));
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
            if(err) reject(createError.InternalServerError("خطای سرور!"));
            // await redisClient.set(userId, token, 'EX', 60 * 60 * 24 * 365); DEBUG THIS!!!
            resolve(token)
        })
    })
}
function verifyRefreshToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            if(err) reject(createError.Unauthorized('!وارد حساب کاربری خود شوید'));
            const {phone} = payload || {};
            const user = await UserModel.findOne({phone}, {password : 0, otp : 0});
            if(!user) reject(createError.Unauthorized('حساب کاربری یافت نشد'));
            const refreshToken = redisClient.get(user?._id || "key_default");
            if(!refreshToken) reject(createError.Unauthorized('ورود مجدد به حساب کاربری انجام نشد'));
            console.log(refreshToken);
            if(token === refreshToken) return resolve(phone);
            reject(createError.Unauthorized('ورود مجدد به حساب کاربری انجام نشد'));
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
    let nullData = Object.values(nullishData);
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
    getTimeOfCourseByChapter
}
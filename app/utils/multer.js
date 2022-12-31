const createError = require('http-errors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

function createRoute(req){
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDate().toString();
    const directory = path.join(__dirname, "..", "..", "public", "uploads", year, month, day);
    req.body.fileUploadPath = path.join("uploads", year, month, day)
    fs.mkdirSync(directory, {recursive : true});
    return directory;
}
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        if(file?.originalname){
            const filePath = createRoute(req);
            return cb(null, filePath)
        }
        cb(null, null)
    },
    filename : (req, file, cb) => {
        if(file.originalname){
            const ext = path.extname(file.originalname);
            const fileName = String(new Date().getTime() + ext)
            req.body.filename = fileName
            return cb(null, fileName)
        }
        cb(null, null)
    }
});
//IMAGE
function fileFilter(req, file, cb){
    const ext = path.extname(file.originalname);
    const mimeTypes = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    if(mimeTypes.includes(ext)){
        return cb(null, true)
    }
    return cb(createError.BadRequest('فرمت ارسال شده تصویر صحیح نمیباشد'))
}
const imageMaxSize = 1 * 1000 * 1000 //1MB
const uploadFile = multer({storage, fileFilter, limits : {fileSize : imageMaxSize}});
//VIDEO
function videoFilter(req, file, cb){
    const ext = path.extname(file.originalname);
    const mimeTypes = ['.mp4', '.mpg', '.mov', '.mkv', '.avi']
    if(mimeTypes.includes(ext)){
        return cb(null, true)
    }
    return cb(createError.BadRequest('فرمت ارسال شده ویدیو صحیح نمیباشد'))
}
const videoMaxSize = 100 * 1000 * 1000 //100MB
const uploadVideo = multer({storage, videoFilter, limits : {fileSize : videoMaxSize}});

module.exports = {
    uploadFile,
    uploadVideo
}
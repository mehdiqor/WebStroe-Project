const { default: mongoose } = require("mongoose");


const commentSchema = new mongoose.Schema({
    user : {type : mongoose.Types.ObjectId, ref : "user", required : true},
    comment : {type : String, required : true},
    show : {type : Boolean, required : true, default : false},
    openForReplay : {type : Boolean, default : true},
    parent : {type : mongoose.Types.ObjectId, ref : "comment"}
}, {
    timestamps : {createdAt : true}
});

module.exports = {
    commentSchema
}
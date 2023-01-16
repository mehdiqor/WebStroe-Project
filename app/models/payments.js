const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    invoiceNumber : {type : String},
    invoiceNumber : {type : Number},
    authority : {type : String},
    amount : {type : Number},
    description : {type : String, default : "Buy Course"},
    verify : {type : Boolean, default : false},
    verify : {type : mongoose.Types.ObjectId, ref : "user"},
    basket : {type : Object, default : {}},
    refID : {type : String, default : undefined},
    cardHash : {type : String, default : undefined},
}, {
    timestamps : true
});

module.exports = {
    PaymentModel : mongoose.model('Payment', Schema)
}
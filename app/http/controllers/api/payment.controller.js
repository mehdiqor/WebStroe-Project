const { getBasketOfUser, notFoundMessage, invoiceNumberGenerator } = require("../../../utils/fuctions");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { StatusCodes: httpStatus } = require("http-status-codes");
const { PROCCESS_MASSAGES } = require("../../../utils/costans");
const { PaymentModel } = require("../../../models/payments");
const { UserModel } = require("../../../models/users");
const { default: axios } = require("axios");
const Controller = require("../controller");
const httpError = require("http-errors");
const moment = require('moment-jalali');

class PaymentController extends Controller{
    async paymentGateway(req, res, next){
        try {
            const user = req.user;
            if(!user.basket.courses && !user.basket.products) throw httpError.BadRequest(PROCCESS_MASSAGES.EMPTY_BASKET);
            const basket = await getBasketOfUser(user._id)[0];
            if(!basket?.payDetail?.paymentAmount) throw httpError.BadRequest(notFoundMessage("Payment Details"));
            const zarinPal_request_url = "https://api.zarinpal.com/pg/v4/payment/request.json";
            const zarinPalGatewayURL = "https://www.zarinpal.com/pg/StartPay";
            const description = PROCCESS_MASSAGES.BUY;
            const amount = basket?.payDetail?.paymentAmount;
            const zarinPal_options = {
                merchant_id,
                amount,
                description,
                metadata : {
                    email : user?.email || "example@gmail.com",
                    mobile : user?.phone
                },
                callback_url : "http://localhost:4000/verify"
            }
            const requestResult = await axios.post(zarinPal_request_url, zarinPal_options)
            .then(result => result.data);
            const {authority, code} = requestResult.data;
            await PaymentModel.create({
                invoiceNumber : invoiceNumberGenerator(),
                paymentDate : moment().format("jYYYYjMMjDDHHmm"),
                amount,
                user : user._id,
                description,
                authority,
                verify : false,
                basket
            })
            if(code == 100 && authority){
                return res.status(httpStatus.OK).json({
                    statusCode : httpStatus.OK,
                    data : {
                        code,
                        gatewayURL : `${zarinPalGatewayURL}/${authority}`
                    }
                })
            }
            throw httpError.BadRequest(PROCCESS_MASSAGES.PARAMETERS)
        } catch (error) {
            next(error)
        }
    }
    async paymentVerify(req, res, next){
        try {
            const {Authority : authority} = req.query
            const verifyURL = "https://api.zarinpal.com/pg/v4/payment/verify.json";
            const payment = await PaymentModel.findOne({authority});
            if(!payment) throw httpError.NotFound(notFoundMessage("transaction"));
            if(payment.verify) throw httpError.BadRequest(PROCCESS_MASSAGES.PAID)
            const verifybody = JSON.stringify({
                authority,
                amount : payment.amount,
                merchant_id : process.env.ZARINPAL_MERCHANTID
            })
            const verifyResult = await fetch(verifyURL, {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : verifybody
            }).then(result => result.json());
            if(verifyResult.data.code == 100){
                await PaymentModel.updateOne(
                    {authority},
                    {
                        $set : {
                            refID : verifyResult.data.ref_id,
                            cardHash : verifyResult.data.card_hash,
                            verify : true
                        }
                    }
                )
                const user = await UserModel.findById(payment.user)
                await UserModel.updateOne(
                    {_id : payment.user},
                    {
                        $push : {
                            courses : payment?.basket?.payDetail?.courseIds || [],
                            products : payment?.basket?.payDetail?.productIds || []
                        },
                        $set : {
                            //age balayi kar nakard, payini javabe
                            // courses : [...payment?.basket?.payDetail?.courseIds || [], ...user.courses],
                            // products : [...payment?.basket?.payDetail?.productIds || [], ...user.products],
                            basket : {
                                courses : [],
                                products : []
                            }
                        }
                    }
                )
                return res.status(httpStatus.OK).json({
                    statusCode : httpStatus.OK,
                    data : {
                        message : PROCCESS_MASSAGES.OK_PAYMENT
                    }
                })
            }
            throw httpError.BadRequest(PROCCESS_MASSAGES.NO_PAYMENT)
        } catch (error) {
            next(error)
        }
    }
    async getAllTransactions(req, res, next){
        try {
            const transacions = await PaymentModel.find({}, {basket : 0}).sort({_id : -1});
            return res.status(httpStatus.OK).json({
                statusCode : httpStatus.OK,
                data : {
                    transacions
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    PaymentController : new PaymentController()
}
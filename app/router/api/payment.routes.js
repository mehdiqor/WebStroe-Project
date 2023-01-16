const { PaymentController } = require("../../http/controllers/api/payment.controller");
const { verifyAccessToken } = require("../../http/middleware/verifyAccessToken");
const router = require("express").Router();

router.post("/payment", verifyAccessToken, PaymentController.paymentGateway);
router.get("/verify", PaymentController.paymentVerify);
router.get("/transactions-list", PaymentController.getAllTransactions);

module.exports = {
    ApiPaymentRouter : router
}
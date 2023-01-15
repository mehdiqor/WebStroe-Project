const { verifyAccessTokenInGraphql } = require("../../http/middleware/verifyAccessToken");
const { StatusCodes : httpStatus} = require("http-status-codes");
const { PROCCESS_MASSAGES } = require("../../utils/costans");
const { ResponseType } = require("../typeDefs/public.type");
const { ProductModel } = require("../../models/produncts");
const { GraphQLString, GraphQLInt } = require("graphql");
const { CourseModel } = require("../../models/course");
const { checkExistModel } = require("../utils");
const { UserModel } = require("../../models/users");
const { copyObject } = require("../../utils/fuctions");

const addProductToBasket = {
    type : ResponseType,
    args : {
        productID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const {productID} = args;
        await checkExistModel(ProductModel, productID);
        const product = await findProductInBasket(user._id, productID);
        if(product){
            await UserModel.updateOne(
                {
                _id : user._id,
                "basket.products.productID" : productID
                },
                {
                    $inc : {
                        "basket.products.$.count" : 1
                    }
                }
            )
        } else{
            await UserModel.updateOne(
                {
                _id : user._id
                },
                {
                    $push : {
                        "basket.products" : {
                            productID,
                            count : 1
                        }
                    }
                }
            )
        }
        return {
            statusCode : httpStatus.OK,
            data : {
                message : PROCCESS_MASSAGES.ADD_BASKET
            }
        }
    }
}
const addCourseToBasket = {
    type : ResponseType,
    args : {
        courseID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const {courseID} = args;
        await checkExistModel(CourseModel, courseID);
        const course = await findCourseInBasket(user._id, courseID);
        if(course){
            await UserModel.updateOne(
                {
                _id : user._id,
                "basket.courses.courseID" : courseID
                },
                {
                    $inc : {
                        "basket.courses.$.count" : 1
                    }
                }
            )
        } else{
            await UserModel.updateOne(
                {
                _id : user._id
                },
                {
                    $push : {
                        "basket.courses" : {
                            courseID,
                            count : 1
                        }
                    }
                }
            )
        }
        return {
            statusCode : httpStatus.OK,
            data : {
                message : PROCCESS_MASSAGES.ADD_BASKET
            }
        }
    }
}
const removeProductFromBasket = {
    type : ResponseType,
    args : {
        productID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const {productID} = args;
        await checkExistModel(ProductModel, productID);
    }
}
const removeCourseFromBasket = {
    type : ResponseType,
    args : {
        courseID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const {courseID} = args;
        await checkExistModel(CourseModel, courseID);
    }
}
async function findProductInBasket(userID, productID){
    const findResult = await UserModel.findOne({
        _id : userID,
        "basket.products.productID" : productID
    }, {
        "basket.products.$" : 1
    })
    const userDetails = copyObject(findResult);
    return userDetails?.basket?.products?.[0]
}
async function findCourseInBasket(userID, courseID){
    const findResult = await UserModel.findOne({
        _id : userID,
        "basket.courses.courseID" : courseID
    }, {
        "basket.courses.$" : 1
    })
    const userDetails = copyObject(findResult);
    return userDetails?.basket?.courses?.[0]
}

module.exports = {
    addProductToBasket,
    addCourseToBasket,
    removeProductFromBasket,
    removeCourseFromBasket
}
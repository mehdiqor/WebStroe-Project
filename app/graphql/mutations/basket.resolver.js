const { verifyAccessTokenInGraphql } = require("../../http/middleware/verifyAccessToken");
const { copyObject, notFoundMessage } = require("../../utils/fuctions");
const { StatusCodes : httpStatus} = require("http-status-codes");
const { PROCCESS_MASSAGES } = require("../../utils/costans");
const { ResponseType } = require("../typeDefs/public.type");
const { ProductModel } = require("../../models/produncts");
const { CourseModel } = require("../../models/course");
const { UserModel } = require("../../models/users");
const { checkExistModel } = require("../utils");
const { GraphQLString } = require("graphql");
const httpError = require("http-errors");

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
        const userCourse = await UserModel.findOne({
            _id : user._id,
            courses : courseID
        });
        if(userCourse) throw httpError.BadRequest(PROCCESS_MASSAGES.EXIST_COURSE)
        const course = await findCourseInBasket(user._id, courseID);
        if(course) throw httpError.BadRequest(PROCCESS_MASSAGES.EXIST_COURSE)
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
        const product = await findProductInBasket(user._id, productID);
        let message;
        if(!product) throw httpError.NotFound(notFoundMessage("product"));
        if(product.count > 1){
            await UserModel.updateOne(
                {
                _id : user._id,
                "basket.products.productID" : productID
                },
                {
                    $inc : {
                        "basket.products.$.count" : -1
                    }
                }
            )
            message = PROCCESS_MASSAGES.MINUS_BASKET
        } else{
            await UserModel.updateOne(
                {
                _id : user._id,
                "basket.products.productID" : productID
                },
                {
                    $pull : {
                        "basket.products" : {
                            productID
                        }
                    }
                }
            )
            message = PROCCESS_MASSAGES.DEL_BASKET
        }
        return {
            statusCode : httpStatus.OK,
            data : {
                message
            }
        }
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
        let message;
        const course = await findCourseInBasket(user._id, courseID);
        if(!course) throw httpError.NotFound(notFoundMessage("course"));
        if(course.count > 1){
            await UserModel.updateOne(
                {
                _id : user._id,
                "basket.courses.courseID" : courseID
                },
                {
                    $inc : {
                        "basket.courses.$.count" : -1
                    }
                }
            )
            message = PROCCESS_MASSAGES.MINUS_BASKET
        } else{
            await UserModel.updateOne(
                {
                _id : user._id,
                "basket.courses.courseID" : courseID
                },
                {
                    $pull : {
                        "basket.courses" : {
                            courseID
                        }
                    }
                }
            )
            message = PROCCESS_MASSAGES.DEL_BASKET
        }
        return {
            statusCode : httpStatus.OK,
            data : {
                message
            }
        }
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
const { GraphQLString } = require("graphql");
const { verifyAccessTokenInGraphql } = require("../../http/middleware/verifyAccessToken");
const { ProductModel } = require("../../models/produncts");
const { StatusCodes : httpStatus} = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.type");
const { PROCCESS_MASSAGES } = require("../../utils/costans");

const likeProduct = {
    type : ResponseType,
    args : {
        productID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const {productID} = args;
        let likedProduct = await ProductModel.findOne({
            _id : productID,
            likes : user._id
        })
        let dislikedProduct = await ProductModel.findOne({
            _id : productID,
            likes : user._id
        })
        const updateQuery = likedProduct ? {$pull : {likes : user._id}} : {$push : {likes : user._id}}
        await ProductModel.updateOne({_id : productID}, updateQuery)
        if(dislikedProduct && !likedProduct){
            await ProductModel.updateOne(
                {
                    _id : productID
                },
                {
                    $pull : {
                        dislikes : user._id
                    }
                }
            )
        }
        return {
            statusCode : httpStatus.CREATED,
            data : {
                message : PROCCESS_MASSAGES.LIKE
            }
        }
    }
}
const likeCourse = {
    type : ResponseType,
    args : {
        courseID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const {courseID} = args;

    }
}
const likeBlog = {
    type : ResponseType,
    args : {
        blogID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const {blogID} = args;

    }
}

module.exports = {
    likeProduct
}
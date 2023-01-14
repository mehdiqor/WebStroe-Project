const { verifyAccessTokenInGraphql } = require("../../http/middleware/verifyAccessToken");
const { StatusCodes : httpStatus} = require("http-status-codes");
const { PROCCESS_MASSAGES } = require("../../utils/costans");
const { ResponseType } = require("../typeDefs/public.type");
const { ProductModel } = require("../../models/produncts");
const { CourseModel } = require("../../models/course");
const { BlogModel } = require("../../models/blogs");
const { checkExistModel } = require("../utils");
const { GraphQLString } = require("graphql");

const likeProduct = {
    type : ResponseType,
    args : {
        productID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const {productID} = args;
        await checkExistModel(ProductModel, productID);
        let likedProduct = await ProductModel.findOne({
            _id : productID,
            likes : user._id
        })
        let dislikedProduct = await ProductModel.findOne({
            _id : productID,
            dislikes : user._id
        })
        const updateQuery = likedProduct ? {$pull : {likes : user._id}} : {$push : {likes : user._id}}
        await ProductModel.updateOne({_id : productID}, updateQuery)
        let message;
        if(!likedProduct){
            if(dislikedProduct){
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
            message = PROCCESS_MASSAGES.LIKE
        } else message = PROCCESS_MASSAGES.UNLIKE
        return {
            statusCode : httpStatus.CREATED,
            data : {
                message
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
        await checkExistModel(CourseModel, courseID);
        let likedCourse = await CourseModel.findOne({
            _id : courseID,
            likes : user._id
        })
        let dislikedCourse = await CourseModel.findOne({
            _id : courseID,
            dislikes : user._id
        })
        const updateQuery = likedCourse ? {$pull : {likes : user._id}} : {$push : {likes : user._id}}
        await CourseModel.updateOne({_id : courseID}, updateQuery);
        let message;
        if(!likedCourse){
            if(dislikedCourse){
                await CourseModel.updateOne(
                    {
                        _id : courseID
                    },
                    {
                        $pull : {
                            dislikes : user._id
                        }
                    }
                )
            }
            message = PROCCESS_MASSAGES.LIKE
        } else message = PROCCESS_MASSAGES.UNLIKE
        return {
            statusCode : httpStatus.CREATED,
            data : {
                message
            }
        }
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
        await checkExistModel(BlogModel, blogID);
        let likedBlog = await BlogModel.findOne({
            _id : blogID,
            likes : user._id
        })
        let dislikedBlog = await BlogModel.findOne({
            _id : blogID,
            dislikes : user._id
        })
        const updateQuery = likedBlog ? {$pull : {likes : user._id}} : {$push : {likes : user._id}}
        await BlogModel.updateOne({_id : blogID}, updateQuery);
        let message;
        if(!likedBlog){
            if(dislikedBlog){
                await BlogModel.updateOne(
                    {
                        _id : blogID
                    },
                    {
                        $pull : {
                            dislikes : user._id
                        }
                    }
                )
            }
            message = PROCCESS_MASSAGES.LIKE
        } else message = PROCCESS_MASSAGES.UNLIKE
        return {
            statusCode : httpStatus.CREATED,
            data : {
                message
            }
        }
    }
}

module.exports = {
    likeProduct,
    likeCourse,
    likeBlog
}
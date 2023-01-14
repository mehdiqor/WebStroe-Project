const { verifyAccessTokenInGraphql } = require("../../http/middleware/verifyAccessToken");
const { StatusCodes : httpStatus} = require("http-status-codes");
const { PROCCESS_MASSAGES } = require("../../utils/costans");
const { ResponseType } = require("../typeDefs/public.type");
const { ProductModel } = require("../../models/produncts");
const { CourseModel } = require("../../models/course");
const { BlogModel } = require("../../models/blogs");
const { checkExistModel } = require("../utils");
const { GraphQLString } = require("graphql");

const dislikeProduct = {
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
        const updateQuery = dislikedProduct ? {$pull : {dislikes : user._id}} : {$push : {dislikes : user._id}}
        await ProductModel.updateOne({_id : productID}, updateQuery)
        let message;
        if(!dislikedProduct){
            if(likedProduct){
                await ProductModel.updateOne(
                    {
                        _id : productID
                    },
                    {
                        $pull : {
                            likes : user._id
                        }
                    }
                )
            }
            message = PROCCESS_MASSAGES.DISLIKE
        } else message = PROCCESS_MASSAGES.UN_DISLIKE
        return {
            statusCode : httpStatus.CREATED,
            data : {
                message
            }
        }
    }
}
const dislikeCourse = {
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
        const updateQuery = dislikedCourse ? {$pull : {dislikes : user._id}} : {$push : {dislikes : user._id}}
        await CourseModel.updateOne({_id : courseID}, updateQuery)
        let message;
        if(!dislikedCourse){
            if(likedCourse){
                await CourseModel.updateOne(
                    {
                        _id : courseID
                    },
                    {
                        $pull : {
                            likes : user._id
                        }
                    }
                )
            }
            message = PROCCESS_MASSAGES.DISLIKE
        } else message = PROCCESS_MASSAGES.UN_DISLIKE
        return {
            statusCode : httpStatus.CREATED,
            data : {
                message
            }
        }
    }
}
const dislikeBlog = {
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
        const updateQuery = dislikedBlog ? {$pull : {dislikes : user._id}} : {$push : {dislikes : user._id}}
        await BlogModel.updateOne({_id : blogID}, updateQuery)
        let message;
        if(!dislikedBlog){
            if(likedBlog){
                await BlogModel.updateOne(
                    {
                        _id : blogID
                    },
                    {
                        $pull : {
                            likes : user._id
                        }
                    }
                )
            }
            message = PROCCESS_MASSAGES.DISLIKE
        } else message = PROCCESS_MASSAGES.UN_DISLIKE
        return {
            statusCode : httpStatus.CREATED,
            data : {
                message
            }
        }
    }
}

module.exports = {
    dislikeProduct,
    dislikeCourse,
    dislikeBlog
}
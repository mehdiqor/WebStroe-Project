const { verifyAccessTokenInGraphql } = require("../../http/middleware/verifyAccessToken");
const { StatusCodes : httpStatus} = require("http-status-codes");
const { PROCCESS_MASSAGES } = require("../../utils/costans");
const { ResponseType } = require("../typeDefs/public.type");
const { ProductModel } = require("../../models/produncts");
const { CourseModel } = require("../../models/course");
const { BlogModel } = require("../../models/blogs");
const { checkExistModel } = require("../utils");
const { GraphQLString } = require("graphql");

const bookmarkProduct = {
    type : ResponseType,
    args : {
        productID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const {productID} = args;
        await checkExistModel(ProductModel, productID);
        let bookmarkedProduct = await ProductModel.findOne({
            _id : productID,
            bookmarks : user._id
        })
        const updateQuery = bookmarkedProduct ? {$pull : {bookmarks : user._id}} : {$push : {bookmarks : user._id}}
        await ProductModel.updateOne({_id : productID}, updateQuery);
        let message;
        if(!bookmarkedProduct){
            message = PROCCESS_MASSAGES.BOOKMARK
        } else message = PROCCESS_MASSAGES.UN_BOOKMARK
        return {
            statusCode : httpStatus.OK,
            data : {
                message
            }
        }
    }
}
const bookmarkCourse = {
    type : ResponseType,
    args : {
        courseID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const {courseID} = args;
        await checkExistModel(CourseModel, courseID);
        let bookmarkedCourse = await CourseModel.findOne({
            _id : courseID,
            bookmarks : user._id
        })
        const updateQuery = bookmarkedCourse ? {$pull : {bookmarks : user._id}} : {$push : {bookmarks : user._id}}
        await CourseModel.updateOne({_id : courseID}, updateQuery);
        let message;
        if(!bookmarkedCourse){
            message = PROCCESS_MASSAGES.BOOKMARK
        } else message = PROCCESS_MASSAGES.UN_BOOKMARK
        return {
            statusCode : httpStatus.OK,
            data : {
                message
            }
        }
    }
}
const bookmarkBlog = {
    type : ResponseType,
    args : {
        blogID : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const {blogID} = args;
        await checkExistModel(BlogModel, blogID);
        let bookmarkedBlog = await BlogModel.findOne({
            _id : blogID,
            bookmarks : user._id
        })
        const updateQuery = bookmarkedBlog ? {$pull : {bookmarks : user._id}} : {$push : {bookmarks : user._id}}
        await BlogModel.updateOne({_id : blogID}, updateQuery);
        let message;
        if(!bookmarkedBlog){
            message = PROCCESS_MASSAGES.BOOKMARK
        } else message = PROCCESS_MASSAGES.UN_BOOKMARK
        return {
            statusCode : httpStatus.OK,
            data : {
                message
            }
        }
    }
}

module.exports = {
    bookmarkProduct,
    bookmarkCourse,
    bookmarkBlog
}
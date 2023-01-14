const { verifyAccessTokenInGraphql } = require("../../http/middleware/verifyAccessToken");
const { ProductType } = require("../typeDefs/product.type");
const { ProductModel } = require("../../models/produncts");
const { CourseType } = require("../typeDefs/course.type");
const { GraphQLList, GraphQLString } = require("graphql");
const { CourseModel } = require("../../models/course");
const { BlogType } = require("../typeDefs/blog.type");
const { BlogModel } = require("../../models/blogs");

const getUserBookmarkedProduct = {
    type : new GraphQLList(ProductType),
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const product = await ProductModel.find({
            bookmarks : user._id
        }).populate([
            {path : 'supplier'},
            {path : 'category'},
            {path : 'comments.user'},
            {path : 'comments.answers.user'},
            {path : 'likes'},
            {path : 'dislikes'},
            {path : 'bookmarks'},
        ]);
        return product
    }
}
const getUserBookmarkedCourse = {
    type : new GraphQLList(CourseType),
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const course = await CourseModel.find({
            bookmarks : user._id
        }).populate([
            {path : 'teacher'},
            {path : 'category'},
            {path : 'comments.user'},
            {path : 'comments.answers.user'},
            {path : 'likes'},
            {path : 'dislikes'},
            {path : 'bookmarks'},
        ]);
        return course
    }
}
const getUserBookmarkedBlog = {
    type : new GraphQLList(BlogType),
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const blog = await BlogModel.find({
            bookmarks : user._id
        }).populate([
            {path : 'author'},
            {path : 'category'},
            {path : 'comments.user'},
            {path : 'comments.answers.user'},
            {path : 'likes'},
            {path : 'dislikes'},
            {path : 'bookmarks'},
        ]);
        return blog
    }
}

module.exports = {
    getUserBookmarkedProduct,
    getUserBookmarkedCourse,
    getUserBookmarkedBlog
}
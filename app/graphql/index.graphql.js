const { addProductToBasket, addCourseToBasket, removeProductFromBasket, removeCourseFromBasket } = require("./mutations/basket.resolver");
const { getUserBookmarkedProduct, getUserBookmarkedCourse, getUserBookmarkedBlog } = require("./queries/user-profile.resolver");
const { CreateCommentForProduct, CreateCommentForCourse, CreateCommentForBlog } = require("./mutations/comment.resolver");
const { bookmarkProduct, bookmarkCourse, bookmarkBlog } = require("./mutations/bookmark.resolver");
const { dislikeProduct, dislikeCourse, dislikeBlog } = require("./mutations/dislike.resolver");
const { CategoriesResolver, CategoryChildResolver } = require("./queries/category.resolver");
const { likeProduct, likeCourse, likeBlog } = require("./mutations/like.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { CorseResolver } = require("./queries/course.resolver");
const { BlogResolver } = require("./queries/blog.resolver");

const RootQuery = new GraphQLObjectType({
    name : "RootQuery",
    fields : {
        blogs : BlogResolver,
        products : ProductResolver,
        categories : CategoriesResolver,
        childOfCategory : CategoryChildResolver,
        courses : CorseResolver
    }
});
const RootMutation = new GraphQLObjectType({
    name : "Mutation",
    fields : {
        CreateCommentForProduct,
        CreateCommentForCourse,
        CreateCommentForBlog,
        likeProduct,
        likeCourse,
        likeBlog,
        dislikeProduct,
        dislikeCourse,
        dislikeBlog,
        bookmarkProduct,
        bookmarkCourse,
        bookmarkBlog,
        getUserBookmarkedProduct,
        getUserBookmarkedCourse,
        getUserBookmarkedBlog,
        addProductToBasket,
        addCourseToBasket,
        removeProductFromBasket,
        removeCourseFromBasket
    }
});
const graphqlSchema = new GraphQLSchema({
    query : RootQuery,
    mutation : RootMutation
});

module.exports = {
    graphqlSchema
}
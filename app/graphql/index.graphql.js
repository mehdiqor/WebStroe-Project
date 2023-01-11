const { CreateCommentForBlog, CreateCommentForCourse, CreateCommentForProduct } = require("./mutations/comment.resolver");
const { CategoriesResolver, CategoryChildResolver } = require("./queries/category.resolver");
const { likeProduct } = require("./mutations/like.resolver");
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
        CreateCommentForBlog,
        CreateCommentForCourse,
        CreateCommentForProduct,
        likeProduct
    }
});
const graphqlSchema = new GraphQLSchema({
    query : RootQuery,
    mutation : RootMutation
});

module.exports = {
    graphqlSchema
}
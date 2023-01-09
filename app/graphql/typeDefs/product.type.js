const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require("graphql");
const { UserType, FeaturesType, PublicCategoryType } = require("./public.type");
const { CommentType } = require("./comment.type");

const ProductType = new GraphQLObjectType({
    name : "ProductType",
    fields : {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
        short_text : {type : GraphQLString},
        text : {type : GraphQLString},
        images : {type : GraphQLString},
        imagesURL : {type : new GraphQLList(GraphQLString)},
        tags : {type : new GraphQLList(GraphQLString)},
        category : {type : PublicCategoryType},
        price : {type : GraphQLInt},
        discount : {type : GraphQLInt},
        count : {type : GraphQLInt},
        type : {type : GraphQLString},
        supplier : {type : UserType},
        features : {type : FeaturesType},
        comments : {type : new GraphQLList(CommentType)},
    }
});

module.exports = {
    ProductType
}
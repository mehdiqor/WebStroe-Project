const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const { UserType, PublicCategoryType } = require("./public.type");

const BlogType = new GraphQLObjectType({
    name : "BlogType",
    fields : {
        _id : {type : GraphQLString},
        author : {type : UserType},
        title : {type : GraphQLString},
        short_text : {type : GraphQLString},
        text : {type : GraphQLString},
        image : {type : GraphQLString},
        imageURL : {type : GraphQLString},
        tags : {type : new GraphQLList(GraphQLString)},
        category : {type : PublicCategoryType}
    }
});

module.exports = {
    BlogType
}
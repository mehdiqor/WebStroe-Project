const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { PublicCategoryType } = require("./public.type");

const CategoriesType = new GraphQLObjectType({
    name : "CategoriesType",
    fields : {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
        children : {type : new GraphQLList(PublicCategoryType)}
    }
})

module.exports = {
    CategoriesType
}
const { GraphQLList, GraphQLString } = require("graphql");
const { CategoryModel } = require("../../models/categories");
const { CategoriesType } = require("../typeDefs/category.type");

const CategoriesResolver = {
    type : new GraphQLList(CategoriesType),
    args : {
        field : {type : GraphQLString}
    },
    resolve : async() => {
        const categories = await CategoryModel.find({parent : undefined});
        return categories
    }
}
const CategoryChildResolver = {
    type : new GraphQLList(CategoriesType),
    args : {
        parent : {type : GraphQLString}
    },
    resolve : async(_, args) => {
        const {parent} = args;
        const categories = await CategoryModel.find({parent});
        return categories
    }
}

module.exports = {
    CategoriesResolver,
    CategoryChildResolver
}
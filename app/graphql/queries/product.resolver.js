const { GraphQLList, GraphQLString } = require("graphql");
const { ProductModel } = require("../../models/produncts");
const { ProductType } = require("../typeDefs/product.type");

const ProductResolver = {
    type : new GraphQLList(ProductType),
    args : {
        category : {type : GraphQLString}
    },
    resolve : async(_, args) => {
        const {category} = args;
        const fundQuery = category ? {category} : {}
        return await ProductModel.find({fundQuery}).populate([
            {path : 'supplier'},
            {path : 'category'},
            {path : 'comments.user'},
            {path : 'comments.answers.user'},
            {path : 'likes'},
            {path : 'dislikes'},
            {path : 'bookmarks'},
        ]);
    }
}

module.exports = {
    ProductResolver
}
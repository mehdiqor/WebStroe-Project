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
        ]);
    }
}

module.exports = {
    ProductResolver
}
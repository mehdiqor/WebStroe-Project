const { GraphQLList } = require("graphql");
const { ProductModel } = require("../../models/produncts");
const { ProductType } = require("../typeDefs/product.type");

const ProductResolver = {
    type : new GraphQLList(ProductType),
    resolve : async() => {
        return await ProductModel.find({}).populate([
            {path : 'supplier'},
            {path : 'category'},
        ]);
    }
}

module.exports = {
    ProductResolver
}
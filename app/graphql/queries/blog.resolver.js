const { GraphQLList, GraphQLString } = require("graphql");
const { BlogModel } = require("../../models/blogs")
const { BlogType } = require("../typeDefs/blog.type")

const BlogResolver = {
    type : new GraphQLList(BlogType),
    args : {
        category : {type : GraphQLString}
    },
    resolve : async(_, args) => {
        const {category} = args;
        const fundQuery = category ? {category} : {}
        return await BlogModel.find({fundQuery}).populate([
            {path : 'author'},
            {path : 'category'}
        ]);
    }
}

module.exports = {
    BlogResolver
}
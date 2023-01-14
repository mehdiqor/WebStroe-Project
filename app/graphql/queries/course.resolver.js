const { GraphQLList, GraphQLString } = require("graphql");
const { CourseModel } = require("../../models/course");
const { CourseType } = require("../typeDefs/course.type");

const CorseResolver = {
    type : new GraphQLList(CourseType),
    args : {
        category : {type : GraphQLString}
    },
    resolve : async(_, args) => {
        const {category} = args;
        const fundQuery = category ? {category} : {}
        return await CourseModel.find({fundQuery}).populate([
            {path : 'teacher'},
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
    CorseResolver
}
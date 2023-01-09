const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");
const { UserType } = require("./public.type");

const ParentOfCommentType = new GraphQLObjectType({
    name : "ParentOfCommentType",
    fields : {
        user : {type : UserType},
        comment : {type : GraphQLString}
    }
});
const CommentType = new GraphQLObjectType({
    name : "CommentType",
    fields : {
        user : {type : UserType},
        comment : {type : GraphQLString},
        show : {type : GraphQLBoolean},
        openForReplay : {type : GraphQLBoolean},
        parent : {type : ParentOfCommentType}
    }
});

module.exports = {
    CommentType
}
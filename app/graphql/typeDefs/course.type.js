const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require("graphql");
const { AuthorType, FeaturesType, PublicCategoryType } = require("./public.type");

const EpisodesTypes = new GraphQLObjectType({
    name : "EpisodesTypes",
    fields : {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
        text : {type : GraphQLString},
        type : {type : GraphQLString},
        time : {type : GraphQLString},
        videoAddress : {type : GraphQLString},
        videoURL : {type : GraphQLString}
    }
});
const ChaptersTypes = new GraphQLObjectType({
    name : "ChaptersTypes",
    fields : {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
        text : {type : GraphQLString},
        episodes : {type : new GraphQLList(EpisodesTypes)}
    }
});
const CourseType = new GraphQLObjectType({
    name : "CourseType",
    fields : {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
        short_text : {type : GraphQLString},
        text : {type : GraphQLString},
        image : {type : GraphQLString},
        imageURL : {type : GraphQLString},
        tags : {type : new GraphQLList(GraphQLString)},
        category : {type : PublicCategoryType},
        price : {type : GraphQLInt},
        discount : {type : GraphQLInt},
        count : {type : GraphQLInt},
        type : {type : GraphQLString},
        status : {type : GraphQLString},
        teacher : {type : AuthorType},
        chapters : {type : new GraphQLList(ChaptersTypes)}
    }
});

module.exports = {
    CourseType
}
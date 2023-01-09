const { verifyAccessTokenInGraphql } = require("../../http/middleware/verifyAccessToken");
const { notFoundMessage, PROCCESS_MASSAGES } = require("../../utils/costans");
const { StatusCodes : httpStatus} = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.type");
const { copyObject } = require("../../utils/fuctions");
const { BlogModel } = require("../../models/blogs");
const { GraphQLString } = require("graphql");
const httpError = require("http-errors");

const CreateCommentForBlog = {
    type : ResponseType,
    args : {
        comment : {type : GraphQLString},
        blogID : {type : GraphQLString},
        parent : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const {comment, blogID, parent} = args;
        await checkExistBlog(blogID);
        const commentDocument = await getComment(BlogModel, parent);
        await BlogModel.updateOne(
            {
                _id : blogID
            },
            {
                $push : {
                    comments : {
                        comment,
                        user : user._id,
                        show : false,
                        openForReplay : !parent
                    }
                }
            }
        );
        return {
            statusCode : httpStatus.CREATED,
            data : {
                message : PROCCESS_MASSAGES.CAREATED
            }
        }
    }
}
async function checkExistBlog(id){
    const blog = await  BlogModel.findById(id);
    if(!blog) throw httpError.NotFound(notFoundMessage("blog"));
    return blog
}
async function getComment(model, id){
    const findedComment = await model.findOne(
        {"comments,_id" : id},
        {"comments.$" : 1}
    );
    const comment = copyObject(findedComment)
    console.log(comment?.comments?.[0]);
    if(!comment?.comments?.[0]) throw httpError.NotFound(notFoundMessage("comment"));
    return comment?.comments?.[0]
}

module.exports = {
    CreateCommentForBlog
}
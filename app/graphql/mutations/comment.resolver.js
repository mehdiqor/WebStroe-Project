const { verifyAccessTokenInGraphql } = require("../../http/middleware/verifyAccessToken");
const { notFoundMessage, PROCCESS_MASSAGES } = require("../../utils/costans");
const { StatusCodes : httpStatus} = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.type");
const { ProductModel } = require("../../models/produncts");
const { CourseModel } = require("../../models/course");
const { copyObject } = require("../../utils/fuctions");
const { BlogModel } = require("../../models/blogs");
const { default: mongoose } = require("mongoose");
const { checkExistModel } = require("../utils");
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
        if(!mongoose.isValidObjectId(blogID)) throw httpError.BadRequest(PROCCESS_MASSAGES.FALSE_ID);
        await checkExistModel(BlogModel, blogID);
        if(parent && mongoose.isValidObjectId(parent)) {
            const commentDocument = await getComment(BlogModel, parent);
            if(commentDocument && !commentDocument?.openForReplay) throw httpError.BadRequest(PROCCESS_MASSAGES.NO_COMMENT);
            const createAnswerResult = await BlogModel.updateOne(
                {
                    _id : blogID,
                    "comments._id" : parent
                },
                {
                    $push : {
                        "comments.$.answers" : {
                            comment,
                            user : user._id,
                            show : false,
                            openForReplay : false
                        }
                    }
                }
            );
            if(!createAnswerResult.modifiedCount) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_CAREATED);
            return {
                statusCode : httpStatus.CREATED,
                data : {
                    message : PROCCESS_MASSAGES.CREATED
                }
            }
        }else{
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
                            openForReplay : true
                        }
                    }
                }
            );
        }
        return {
            statusCode : httpStatus.CREATED,
            data : {
                message : PROCCESS_MASSAGES.CAREATED
            }
        }
    }
}
const CreateCommentForProduct = {
    type : ResponseType,
    args : {
        comment : {type : GraphQLString},
        productID : {type : GraphQLString},
        parent : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const {comment, productID, parent} = args;
        if(!mongoose.isValidObjectId(productID)) throw httpError.BadRequest(PROCCESS_MASSAGES.FALSE_ID);
        await checkExistModel(ProductModel, productID);
        if(parent && mongoose.isValidObjectId(parent)) {
            const commentDocument = await getComment(ProductModel, parent);
            if(commentDocument && !commentDocument?.openForReplay) throw httpError.BadRequest(PROCCESS_MASSAGES.NO_COMMENT);
            const createAnswerResult = await ProductModel.updateOne(
                {
                    _id : productID,
                    "comments._id" : parent
                },
                {
                    $push : {
                        "comments.$.answers" : {
                            comment,
                            user : user._id,
                            show : false,
                            openForReplay : false
                        }
                    }
                }
            );
            if(!createAnswerResult.modifiedCount) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_CAREATED);
            return {
                statusCode : httpStatus.CREATED,
                data : {
                    message : PROCCESS_MASSAGES.CREATED
                }
            }
        }else{
            await ProductModel.updateOne(
                {
                    _id : productID
                },
                {
                    $push : {
                        comments : {
                            comment,
                            user : user._id,
                            show : false,
                            openForReplay : true
                        }
                    }
                }
            );
        }
        return {
            statusCode : httpStatus.CREATED,
            data : {
                message : PROCCESS_MASSAGES.CAREATED
            }
        }
    }
}
const CreateCommentForCourse = {
    type : ResponseType,
    args : {
        comment : {type : GraphQLString},
        courseID : {type : GraphQLString},
        parent : {type : GraphQLString}
    },
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const {comment, courseID, parent} = args;
        if(!mongoose.isValidObjectId(courseID)) throw httpError.BadRequest(PROCCESS_MASSAGES.FALSE_ID);
        await checkExistModel(CourseModel, courseID);
        if(parent && mongoose.isValidObjectId(parent)) {
            const commentDocument = await getComment(CourseModel, parent);
            if(commentDocument && !commentDocument?.openForReplay) throw httpError.BadRequest(PROCCESS_MASSAGES.NO_COMMENT);
            const createAnswerResult = await CourseModel.updateOne(
                {
                    _id : courseID,
                    "comments._id" : parent
                },
                {
                    $push : {
                        "comments.$.answers" : {
                            comment,
                            user : user._id,
                            show : false,
                            openForReplay : false
                        }
                    }
                }
            );
            if(!createAnswerResult.modifiedCount) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_CAREATED);
            return {
                statusCode : httpStatus.CREATED,
                data : {
                    message : PROCCESS_MASSAGES.CREATED
                }
            }
        }else{
            await CourseModel.updateOne(
                {
                    _id : courseID
                },
                {
                    $push : {
                        comments : {
                            comment,
                            user : user._id,
                            show : false,
                            openForReplay : true
                        }
                    }
                }
            );
        }
        return {
            statusCode : httpStatus.CREATED,
            data : {
                message : PROCCESS_MASSAGES.CAREATED
            }
        }
    }
}
async function getComment(model, id){
    const findedComment = await model.findOne(
        {"comments._id" : id},
        {"comments.$" : 1}
    );
    const comment = copyObject(findedComment)
    console.log(comment?.comments?.[0]);
    if(!comment?.comments?.[0]) throw httpError.NotFound(notFoundMessage("comment"));
    return comment?.comments?.[0]
}

module.exports = {
    CreateCommentForBlog,
    CreateCommentForProduct,
    CreateCommentForCourse
}
const { verifyAccessTokenInGraphql } = require("../../http/middleware/verifyAccessToken");
const { ProductType } = require("../typeDefs/product.type");
const { ProductModel } = require("../../models/produncts");
const { CourseType } = require("../typeDefs/course.type");
const { GraphQLList, GraphQLString } = require("graphql");
const { CourseModel } = require("../../models/course");
const { BlogType } = require("../typeDefs/blog.type");
const { BlogModel } = require("../../models/blogs");
const { AnyType } = require("../typeDefs/public.type");
const { UserModel } = require("../../models/users");

const getUserBookmarkedProduct = {
    type : new GraphQLList(ProductType),
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const product = await ProductModel.find({
            bookmarks : user._id
        }).populate([
            {path : 'supplier'},
            {path : 'category'},
            {path : 'comments.user'},
            {path : 'comments.answers.user'},
            {path : 'likes'},
            {path : 'dislikes'},
            {path : 'bookmarks'},
        ]);
        return product
    }
}
const getUserBookmarkedCourse = {
    type : new GraphQLList(CourseType),
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const course = await CourseModel.find({
            bookmarks : user._id
        }).populate([
            {path : 'teacher'},
            {path : 'category'},
            {path : 'comments.user'},
            {path : 'comments.answers.user'},
            {path : 'likes'},
            {path : 'dislikes'},
            {path : 'bookmarks'},
        ]);
        return course
    }
}
const getUserBookmarkedBlog = {
    type : new GraphQLList(BlogType),
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const blog = await BlogModel.find({
            bookmarks : user._id
        }).populate([
            {path : 'author'},
            {path : 'category'},
            {path : 'comments.user'},
            {path : 'comments.answers.user'},
            {path : 'likes'},
            {path : 'dislikes'},
            {path : 'bookmarks'},
        ]);
        return blog
    }
}
const getUserBasket = {
    type : AnyType,
    resolve : async(_, args, context) => {
        const {req} = context;
        const user = await verifyAccessTokenInGraphql(req);
        const userDetails = await UserModel.aggregate([
            {
                $match : {_id : user._id}
            },
            {
                $project : {basket : 1}
            },
            {
                $lookup : {
                    from : "products",
                    localField : "basket.products.productID",
                    foreignField : "_id",
                    as : "productDetail"
                }
            },
            {
                $lookup : {
                    from : "courses",
                    localField : "basket.courses.courseID",
                    foreignField : "_id",
                    as : "courseDetail"
                }
            },
            {
                $addFields : {
                    "productDetail.basketDetail" : {
                        $function : {
                            body : function(productDetail, products){
                                return productDetail.map(function(product){
                                    const productCount = products.find(item => item.productID.valueOf() == product._id.valueOf()).count;
                                    const totalPrice = productCount * product.price;
                                    return {
                                        ...product,
                                        basketCount : productCount,
                                        totalPrice,
                                        finalPrice : totalPrice - ((product.discount / 100) * totalPrice)
                                    }
                                })
                            },
                            args : ["$productDetail", "$basket.products"],
                            lang : "js"
                        }
                    }
                }
            },
            {
                $project : {
                    basket : 0
                }
            }
        ]);
        console.log(userDetails);
        return userDetails
    }
}

module.exports = {
    getUserBookmarkedProduct,
    getUserBookmarkedCourse,
    getUserBookmarkedBlog,
    getUserBasket
}
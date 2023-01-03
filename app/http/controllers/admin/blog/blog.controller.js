const { deleteFileInPublic, deleteInvalidPropertyInObject } = require("../../../../utils/fuctions");
const { createBlogsSchema } = require("../../../validators/admin/blog.schema");
const { PROCCESS_MASSAGES } = require("../../../../utils/costans");
const { StatusCodes : httpStatus } = require('http-status-codes');
const { BlogModel } = require("../../../../models/blogs");
const Controller = require("../../controller");
const httpError = require("http-errors");
const path = require("path");

class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
      const blogDataBody = await createBlogsSchema.validateAsync(req.body);
      req.body.image = path.join(
        blogDataBody.fileUploadPath,
        blogDataBody.filename
      );
      req.body.image = req.body.image.replace(/\\/g, "/");
      const { title, text, short_text, tags, category } = blogDataBody;
      const image = req.body.image;
      const author = req.user._id;
      const blog = await BlogModel.create({
        title,
        text,
        short_text,
        tags,
        category,
        image,
        author,
      });
      if(!blog) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_CAREATED);
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: PROCCESS_MASSAGES.CAREATED
        }
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async UpdateBlog(req, res, next) {
    try {
      const { id } = req.params;
      await this.findBlog(id);
      if (req?.body?.fileUploadPath && req?.body?.filename) {
        req.body.image = path.join(req.body.fileUploadPath, req.body.filename);
        req.body.image = req.body.image.replace(/\\/g, "/");
      }
      const data = req.body;
      const BlackList = ["bookmarks", "likes", "dislikes", "comments", "supplier", "length", "width", "height", "weight"];
      deleteInvalidPropertyInObject(data, BlackList);
      
      const updateResult = await BlogModel.updateOne({_id : id}, {$set : data});
      if(updateResult.modifiedCount == 0) throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_UPDATED);
      return res.status(httpStatus.OK).json({
        statusCode : httpStatus.OK,
        data : {
          message: PROCCESS_MASSAGES.UPDATED
        }
      });
    } catch (error) {
      deleteFileInPublic(req?.body?.image);
      next(error);
    }
  }
  async getAllBlogs(req, res, next) {
    try {
      const blogs = await BlogModel.aggregate([
        {
          $match: {},
        },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "author",
            as: "author",
          },
        },
        {
          $unwind: "$author",
        },
        {
          $lookup: {
            from: "categories",
            foreignField: "_id",
            localField: "category",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $project: {
            "category.__v": 0,
            "author.__v": 0,
            "author.otp": 0,
            "author.roles": 0,
            "author.discount": 0,
            "author.bills": 0,
          },
        },
      ]);
      return res.status(httpStatus.OK).json({
        statusCode : httpStatus.OK,
        data : {
          blogs,
        }
      });
    } catch (error) {
      next(error);
    }
  }
  async getBlogByID(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await this.findBlog(id);
      return res.status(httpStatus.OK).json({
        statusCode : httpStatus.OK,
        data : {
          blog,
        }
      });
    } catch (error) {
      next(error);
    }
  }
  async getCommentsOfBlog(req, res, next) {
    try {
        
    } catch (error) {
      next(error);
    }
  }
  async deleteBlog(req, res, next) {
    try {
      const { id } = req.params;
      await this.findBlog(id);
      const result = await BlogModel.deleteOne({ _id: id });
      if (result.deletedCount == 0)
        throw httpError.InternalServerError(PROCCESS_MASSAGES.NOT_DELETED);
      return res.status(httpStatus.OK).json({
        statusCode : httpStatus.OK,
        data : {
          message: PROCCESS_MASSAGES.DELETED
        }
      });
    } catch (error) {
      next(error);
    }
  }
  async findBlog(id) {
    const blog = await BlogModel.findById(id).populate([
      {
        path: "category",
        select: ["title"],
      },
      {
        path: "author",
        select: ["mobile", "first_name", "last_name", "username"],
      },
    ]);
    if (!blog) throw httpError.NotFound("مقاله ای یافت نشد");
    delete blog.category.children;
    return blog;
  }
}

module.exports = {
  AdminBlogController: new BlogController(),
};

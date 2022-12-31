const { deleteFileInPublic, deleteInvalidPropertyInObject } = require("../../../../utils/fuctions");
const { createBlogsSchema } = require("../../../validators/admin/blog.schema");
const { BlackList, nullishData } = require("../../../../utils/costans");
const { StatusCodes : httpStatus } = require('http-status-codes');
const { BlogModel } = require("../../../../models/blogs");
const Controller = require("../../controller");
const createError = require("http-errors");
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
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "ایجاد بلاگ با موفقیت انجام شد",
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async getOneBlogByID(req, res, next) {
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
  async getListOfBlogs(req, res, next) {
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
            "author.Roles": 0,
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
  async getCommentsOfBlog(req, res, next) {
    try {
        
    } catch (error) {
      next(error);
    }
  }
  async deleteBlogByID(req, res, next) {
    try {
      const { id } = req.params;
      await this.findBlog(id);
      const result = await BlogModel.deleteOne({ _id: id });
      if (result.deletedCount == 0)
        throw createError.InternalServerError("حذف مقاله انجام نشد");
      return res.status(httpStatus.OK).json({
        statusCode : httpStatus.OK,
        data : {
          message: "حذف مقاله با موفقیت انجام شد",
        }
      });
    } catch (error) {
      next(error);
    }
  }
  async UpdateBlogByID(req, res, next) {
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
      if(updateResult.modifiedCount == 0) throw createError.InternalServerError("بروزرسانی انجام نشد");
      return res.status(httpStatus.OK).json({
        statusCode : httpStatus.OK,
        data : {
          message: "بروزرسانی بلاگ با موفقیت انجام شد"
        }
      });
    } catch (error) {
      deleteFileInPublic(req?.body?.image);
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
    if (!blog) throw createError.NotFound("مقاله ای یافت نشد");
    delete blog.category.children;
    return blog;
  }
}

module.exports = {
  AdminBlogController: new BlogController(),
};

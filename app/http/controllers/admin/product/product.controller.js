const { deleteFileInPublic, listOfImagesFromRequest, copyObject, setFeatures, deleteInvalidPropertyInObject } = require("../../../../utils/fuctions");
const { createProductSchema } = require("../../../validators/admin/product.schema");
const { ObjectIdValidator } = require("../../../validators/admin/public.validator");
const { StatusCodes : httpStatus } = require("http-status-codes");
const { ProductModel } = require("../../../../models/produncts");
const Controller = require("../../controller");
const httpError = require("http-errors");

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      const images = listOfImagesFromRequest(req?.files || [], req.body.fileUploadPath);
      const productBody = await createProductSchema.validateAsync(req.body);
      const {
        title,
        text,
        short_text,
        tags,
        category,
        price,
        count,
        discount,
        type
      } = productBody;
      const supplier = req.user._id;
      let feature = setFeatures(req.body);
      const product = await ProductModel.create({
        title,
        text,
        short_text,
        category,
        tags,
        count,
        price,
        discount,
        images,
        feature,
        supplier,
        type,
      });
      return res.status(httpStatus.CREATED).json({
        statusCode : httpStatus.CREATED,
        data : {
          message: "محصول با موفقیت ثبت شد",
        }
      });
    } catch (error) {
      deleteFileInPublic(req.body.images);
      next(error);
    }
  }
  async editProduct(req, res, next) {
    try {
      const {id} = req.params;
      const product = await this.findProductByID(id);
      const data = copyObject(req.body);
      data.images = listOfImagesFromRequest( req?.files || [], req.body.fileUploadPath);
      data.features = setFeatures(req.body);
      const BlackList = ["bookmarks", "likes", "dislikes", "comments", "supplier", "length", "width", "height", "weight"];
      deleteInvalidPropertyInObject(data, BlackList);
      
      const updateResult = await ProductModel.updateOne({_id : product._id}, {$set : data});
      if(updateResult.modifiedCount == 0) throw {status : httpStatus.INTERNAL_SERVER_ERROR, message : "خطای داخلی"};
      return res.status(httpStatus.OK).json({
        statusCode : httpStatus.OK,
        data : {
          message : "بروزرسانی با موفقیت انجام شد",
        }
      })
    } catch (error) {
      next(error);
    }
  }
  async removeProductByID(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductByID(id);
      const removeProductResult = await ProductModel.deleteOne({
        _id: product._id,
      });
      if (removeProductResult.deletedCount == 0)
        throw httpError.InternalServerError("محصول حذف نشد");
      res.status(httpStatus.OK).json({
        statusCode : httpStatus.OK,
        data : {
          message : "محصول با موفقیت حذف شد",
        }
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllProduct(req, res, next) {
    try {
      const search = req?.query?.search || "";
      let products;
      if (search) {
        products = await ProductModel.find({
          $text: {
            $search: new RegExp(search, "ig"),
          },
        });
      } else {
        products = await ProductModel.find({});
      }
      return res.status(httpStatus.OK).json({
        statusCode : httpStatus.OK,
        data : {
          products,
        }
      });
    } catch (error) {
      next(error);
    }
  }
  async getProductByID(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductByID(id);
      res.status(httpStatus.OK).json({
        statusCode : httpStatus.OK,
        data : {
          product
        }
      });
    } catch (error) {
      next(error);
    }
  }
  async findProductByID(productID) {
    const { id } = await ObjectIdValidator.validateAsync({ id: productID });
    const product = await ProductModel.findById(id);
    if (!product) throw httpError.NotFound("محصولی یافت نشد");
    return product;
  }
}

module.exports = {
  ProductController: new ProductController(),
};

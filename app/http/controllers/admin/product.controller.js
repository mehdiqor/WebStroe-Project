const { deleteFileInPublic, listOfImagesFromRequest } = require("../../../utils/fuctions");
const { createProductSchema } = require("../../validators/admin/product.schema");
const { ObjectIdValidator } = require("../../validators/admin/public.validator");
const { StatusCodes : httpStatus } = require('http-status-codes');
const { ProductModel } = require("../../../models/produncts");
const Controller = require("../controller");
const createError = require('http-errors');

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
        const images = listOfImagesFromRequest(req?.files || [], req.body.fileUploadPath)
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
            width,
            length,
            height,
            weight,
        } = productBody;
        const supplier = req.user._id;

        let feature = {}, type = "physical"
        if(!isNaN(+width) || !isNaN(+weight) || !isNaN(+length) || !isNaN(+height)){
            if (!width) feature.width = 0;
            else feature.width = +width;
            if (!length) feature.length = 0;
            else feature.length = +length;
            if (!height) feature.height = 0;
            else feature.height = +height;
            if (!weight) feature.weight = 0;
            else feature.weight = +weight;
        }else {
            type = "virtual"
        }

        const product = await ProductModel.create({
            title,
            text,
            short_text,
            tags,
            category,
            price,
            count,
            discount,
            images,
            feature,
            type,
            supplier
        });

        return res.status(httpStatus.CREATED).json({
            data : {
                statusCode : httpStatus.CREATED,
                message : "محصول با موفقیت ثبت شد"
            }
        });
    } catch (error) {
        deleteFileInPublic(req.body.image);
        next(error);
    }
  }
  async editProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async removeProductByID(req, res, next) {
    try {
        const {id} = req.params;
        const product = await this.findProductByID(id);
        const removeProductResult = await ProductModel.deleteOne({_id : product._id});
        if(removeProductResult.deletedCount == 0) throw createError.InternalServerError("محصول حذف نشد");
        res.status(httpStatus.OK).json({
            data : {
                statusCode : httpStatus.OK,
                message : "محصول با موفقیت حذف شد"
            }
        })
    } catch (error) {
      next(error);
    }
  }
  async getAllProduct(req, res, next) {
    try {
      const search = req?.query?.search || "";
      let products;
      if(search) {
        products = await ProductModel.find({
          $text : {
            $search : new RegExp(search, "ig")
          }
        })
      } else {
        products = await ProductModel.find({});
      }
        return res.status(httpStatus.OK).json({
            data : {
                statusCode : httpStatus.OK,
                products
            }
        })
    } catch (error) {
      next(error);
    }
  }
  async getProductByID(req, res, next) {
    try {
        const {id} = req.params;
        const product = await this.findProductByID(id);
        res.status(httpStatus.OK).json({
            data : {
                statusCode : httpStatus.OK,
                product
            }
        })
    } catch (error) {
      next(error);
    }
  }
  async findProductByID(productID){
    const {id} = await ObjectIdValidator.validateAsync({id : productID});
    const product = await ProductModel.findById(id);
    if(!product) throw createError.NotFound("محصولی یافت نشد");
    return product
  }
}

module.exports = {
  ProductController: new ProductController(),
};

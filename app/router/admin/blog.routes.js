const { AdminBlogController } = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middleware/stringToArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              rqeuired:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of blog
 *                  short_text:
 *                      type: string
 *                      description: short text of blog
 *                  text:
 *                      type: string
 *                      description: text of blog
 *                  tags:
 *                      type: string
 *                      description: tags of blog
 *                  category:
 *                      type: string
 *                      description: category of blog
 *                  image:
 *                      type: file
 *                      description: image of blog
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Blog:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of blog
 *                  short_text:
 *                      type: string
 *                      description: short text of blog
 *                  text:
 *                      type: string
 *                      description: text of blog
 *                  tags:
 *                      type: string
 *                      description: tags of blog
 *                  category:
 *                      type: string
 *                      description: category of blog
 *                  image:
 *                      type: file
 *                      description: image of blog
 */

/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags: [Blog]
 *          summary: create blog document
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *          responses:
 *              201:
 *                  description: created
 */
router.post("/add", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.createBlog);

/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags: [Blog]
 *          summary: edit blog documents by ID
 *          consumes:
 *              - multipart/form-data
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Blog'
 *          responses:
 *              201:
 *                  description: created
 */
router.patch("/update/:id", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.UpdateBlogByID);

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [Blog]
 *          summary: get all blogs
 *          responses:
 *              200:
 *                  description: success - get array of blogs
 */
router.get("/", AdminBlogController.getListOfBlogs);

/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          summary: get blog by ID and populate this fields
 *          tags: [Blog]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:id", AdminBlogController.getOneBlogByID);

/**
 * @swagger
 *  /admin/blogs/{id}:
 *      delete:
 *          summary: delete blog by ID
 *          tags: [Blog]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.delete("/:id", AdminBlogController.deleteBlogByID);

module.exports = {
    AdminApiBlogRouter : router
}
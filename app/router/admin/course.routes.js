const { CourseController } = require("../../http/controllers/admin/course.controller");
const { stringToArray } = require('../../http/middleware/stringToArray');
const { uploadFile } = require('../../utils/multer');
const router = require("express").Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Types:
 *              type: string
 *              enum:
 *                  -   free
 *                  -   cash
 *                  -   special
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Course:
 *              type : object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   image
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of course
 *                      example: عنوان دوره
 *                  short_text:
 *                      type: string
 *                      description: short_text of course
 *                      example: توضیحات مختصر
 *                  text:
 *                      type: string
 *                      description: the text of course
 *                      example: توضیحات دوره
 *                  tags:
 *                      type: array
 *                      description: the tags of course
 *                  category:
 *                      type: string
 *                      description: the category of course
 *                      example: 639dccda74ff926f06c2fe21
 *                  price:
 *                      type: string
 *                      description: price of course
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: discount of course
 *                      example: 10
 *                  image:
 *                      type: string
 *                      format: binary
 *                  type:
 *                      $ref: '#/components/schemas/Types'
 */

/**
 * @swagger
 *  /admin/courses/add:
 *      post:
 *          tags: [Course]
 *          summary: create and save course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
 *          responses:
 *              201:
 *                  description: new course created
 */
router.post("/add", uploadFile.single("image"), stringToArray("tags"), CourseController.addCourse)

// router.put("/add-chapter")

// router.put("/add-episode")

// router.patch("/edit/:id")

/**
 * @swagger
 *  /admin/courses/list-of-all:
 *      get:
 *          tags: [Course]
 *          summary: get all of courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: text
 *                  description: search with title, text and short text
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/list-of-all", CourseController.getListOfProduct)

// router.get("/:id")

// router.delete("/remove/:id")

module.exports = {
    AdminApiCourseRouter : router
}
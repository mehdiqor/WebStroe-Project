const { CorseController } = require("../../http/controllers/admin/course.controller");
const router = require("express").Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type : object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: test title
 *                  short_text:
 *                      type: string
 *                      description: the short_text of product
 *                      example: test summary
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                      example: test description
 *                  tags:
 *                      type: array
 *                      description: the tags of product
 *                  category:
 *                      type: string
 *                      description: the category of product
 *                      example: 639dccda74ff926f06c2fe21
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the discount of product
 *                      example: 10
 *                  count:
 *                      type: string
 *                      description: the count of product
 *                      example: 20
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  weight:
 *                      type: string
 *                      description: the weight of product packet
 *                      example: 0
 *                  height:
 *                      type: string
 *                      description: the height of product packet
 *                      example: 0
 *                  width:
 *                      type: string
 *                      description: the width of product packet
 *                      example: 0
 *                  lenght:
 *                      type: string
 *                      description: the lenght of product
 *                      example: 0
 *                  type:
 *                      type: string
 *                      description: the type of product
 *                      example: virtual - physical
 *                  colors:
 *                      $ref: '#/components/schemas/Colors'
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Product:
 *              type : object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: test title
 *                  short_text:
 *                      type: string
 *                      description: the short_text of product
 *                      example: test summary
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                      example: test description
 *                  tags:
 *                      type: array
 *                      description: the tags of product
 *                  category:
 *                      type: string
 *                      description: the category of product
 *                      example: 639dccda74ff926f06c2fe21
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the discount of product
 *                      example: 10
 *                  count:
 *                      type: string
 *                      description: the count of product
 *                      example: 20
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  weight:
 *                      type: string
 *                      description: the weight of product packet
 *                      example: 0
 *                  height:
 *                      type: string
 *                      description: the height of product packet
 *                      example: 0
 *                  width:
 *                      type: string
 *                      description: the width of product packet
 *                      example: 0
 *                  lenght:
 *                      type: string
 *                      description: the lenght of product
 *                      example: 0
 *                  type:
 *                      type: string
 *                      description: the type of product
 *                      example: virtual - physical
 *                  colors:
 *                      $ref: '#/components/schemas/Colors'
 */

// router.post("/add")

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
router.get("/list-of-all", CorseController.getListOfProduct)

// router.get("/:id")

// router.delete("/remove/:id")

module.exports = {
    AdminApiCourseRouter : router
}
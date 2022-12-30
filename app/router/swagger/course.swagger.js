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
 *          Status:
 *              type: string
 *              enum:
 *                  -   notStarted
 *                  -   inProgress
 *                  -   completed
 */
/**
 * @swagger
 *  definitions:
 *      ListOfCourses:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      example: "63ad7d9d14556b64712acc67"
 *                  title:
 *                      type: string
 *                      example: "title of course"
 *                  text:
 *                      type: string
 *                      example: "description of course"
 *                  short_text:
 *                      type: string
 *                      example: "summary of course"
 *                  status:
 *                      type: string
 *                      example: "notStarted | inProgress | completed"
 *                  time:
 *                      type: string
 *                      example: "01:22:44"
 *                  price:
 *                      type: integer
 *                      example: 250,000
 *                  discount:
 *                      type: integer
 *                      example: 10
 *                  studentCount:
 *                      type: integer
 *                      example: 150
 *                  teacher:
 *                      type: string
 *                      example: "erfan yousefi"
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
 *                  -   status
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
 *                  status:
 *                      $ref: '#/components/schemas/Status'
 */

/**
 * @swagger
 *  /admin/courses/add-course:
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
/**
 * @swagger
 *  /admin/courses/list-of-all:
 *      get:
 *          tags: [Course]
 *          summary: get all of courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search with title, text and short text
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/jason:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCourses'
 */
/**
 * @swagger
 *  /admin/courses/{id}:
 *      get:
 *          tags: [Course]
 *          summary: get courses by ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: find course by ID
 *          responses:
 *              200:
 *                  description: success
 */
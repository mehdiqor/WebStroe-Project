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
 *  definitions:
 *      ListOfBlogs:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      blogs:
 *                           type: array
 *                           items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "63ad7d9d14556b64712acc67"
 *                                  author:
 *                                      type: object
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                              example: "63ad7d9d14556b64712acc67"
 *                                          phone:
 *                                              type: integer
 *                                              example: 9123456789
 *                                          roles:
 *                                              type: string
 *                                              example: "USER"
 *                                  title:
 *                                      type: string
 *                                      example: "title of blog"
 *                                  short_text:
 *                                      type: string
 *                                      example: "summary of blog"
 *                                  text:
 *                                      type: string
 *                                      example: "description of blog"
 *                                  image:
 *                                      type: string
 *                                      example: "uploads/date/name.jpg"
 *                                  tags:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          example: "tag1"
 *                                  category:
 *                                      type: object
 *                                      properties:
 *                                          _id:
 *                                              type: string
 *                                              example: "63ad7d9d14556b64712acc67"
 *                                          title:
 *                                              type: string
 *                                              example: "programing"
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
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */
/**
 * @swagger
 *  /admin/blogs/edit/{id}:
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
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */
/**
 * @swagger
 *  /admin/blogs/list-of-all:
 *      get:
 *          tags: [Blog]
 *          summary: get all blogs
 *          responses:
 *              200:
 *                  description: success - get array of blogs
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfBlogs'
 */
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
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfBlogs'
 */
/**
 * @swagger
 *  /admin/blogs/remove/{id}:
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
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Type:
 *              type: string
 *              enum:
 *                  -   virtual
 *                  -   physical
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Colors:
 *              type: array
 *              items:
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   white
 *                      -   gray
 *                      -   red
 *                      -   blu
 *                      -   yellow
 *                      -   green
 *                      -   orange
 *                      -   purple
 */
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
 *                  -   category
 *                  -   price
 *                  -   count
 *                  -   discount
 *                  -   type
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
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  type:
 *                      $ref: '#/components/schemas/Type'
 *                  colors:
 *                      $ref: '#/components/schemas/Colors'
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                      example: 2500000
 *                  count:
 *                      type: string
 *                      description: the count of product
 *                      example: 20
 *                  discount:
 *                      type: string
 *                      description: the discount of product
 *                      example: 10
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
/**
 * @swagger
 *  definitions:
 *      ListOfProducts:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      products:
 *                           type: array
 *                           items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "63ad7d9d14556b64712acc67"
 *                                  title:
 *                                      type: string
 *                                      example: "title of product"
 *                                  short_text:
 *                                      type: string
 *                                      example: "summary of product"
 *                                  text:
 *                                      type: string
 *                                      example: "description of product"
 *                                  category:
 *                                      type: string
 *                                      example: "63ad7d9d14556b64712acc67"
 *                                  price:
 *                                      type: integer
 *                                      example: 250000
 *                                  discount:
 *                                      type: integer
 *                                      example: 10
 *                                  count:
 *                                      type: integer
 *                                      example: 500
 *                                  type:
 *                                      type: string
 *                                      example: "physical | virtual"
 *                                  supplier:
 *                                      type: string
 *                                      example: "63ad7d9d14556b64712acc67"
 */

/**
 * @swagger
 *  /admin/products/create:
 *      post:
 *          tags: [Product]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: created new product
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */
/**
 * @swagger
 *  /admin/products/update/{id}:
 *      patch:
 *          tags: [Product]
 *          summary: edit and update product
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id for find product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Product'
 *          responses:
 *              200:
 *                  description: product updated
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */
/**
 * @swagger
 *  /admin/products/list:
 *      get:
 *          tags: [Product]
 *          summary: list of all products
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title, text and short text of product
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfProducts'
 */
/**
 * @swagger
 *  /admin/products/{id}:
 *      get:
 *          tags: [Product]
 *          summary: get product by ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  dscription: objectID of product
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfProducts'
 */
/**
 * @swagger
 *  /admin/products/delete/{id}:
 *      delete:
 *          tags: [Product]
 *          summary: delete product by ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  dscription: objectID of product
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */

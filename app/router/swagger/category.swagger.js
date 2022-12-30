/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of category
 *                  parent:
 *                      type: string
 *                      description: parent of category
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Category:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of category
 *                  parent:
 *                      type: string
 *                      description: parent of category
 */

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category]
 *          summary: create new category title
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *              201:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/category/edit/{id}:
 *      patch:
 *          tags: [Category]
 *          summary: edit category title with ID
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Category'
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: internal server error
 */
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Category]
 *          summary: get all children of parents category
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Category]
 *          summary: get all parents of category or category head
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Category]
 *          summary: get all categories
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [Category]
 *          summary: get all ctegories without populate and nested structure
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Category]
 *          summary: find category with ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Category]
 *          summary: remove category with ObjectID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

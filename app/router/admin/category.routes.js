const { CategoryController } = require('../../http/controllers/admin/category.controller');
const router = require('express').Router();

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
 *  /admin/category/add:
 *      post:
 *          tags: [Category]
 *          summary: create new category title
<<<<<<< HEAD:app/router/admin/category.js
 *          parameters:
 *              -   in: header
 *                  example: Bearer token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTMxNDE2OTE1IiwiaWF0IjoxNjcxOTY3MzE0LCJleHAiOjE2NzIwNTM3MTR9.VxlzJojl7pAymc80pEpLIYyRqXd60tMCWrua7Z9hCaY
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  name: parent
=======
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
>>>>>>> develop:app/router/admin/category.routes.js
 *          responses:
 *              201:
 *                  description: success
 */
router.post("/add", CategoryController.addCategory);

/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [list-category]
 *          summary: get all children of parents category
 *          parameters:
 *              -   in: header
 *                  example: Bearer token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTMxNDE2OTE1IiwiaWF0IjoxNjcxOTY3MzE0LCJleHAiOjE2NzIwNTM3MTR9.VxlzJojl7pAymc80pEpLIYyRqXd60tMCWrua7Z9hCaY
 *                  name: access-token
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/parents", CategoryController.getAllParents);

/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [list-category]
 *          summary: get all parents of category or category head
 *          parameters:
 *              -   in: header
 *                  example: Bearer token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTMxNDE2OTE1IiwiaWF0IjoxNjcxOTY3MzE0LCJleHAiOjE2NzIwNTM3MTR9.VxlzJojl7pAymc80pEpLIYyRqXd60tMCWrua7Z9hCaY
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/children/:parent", CategoryController.getChildOfParents);

/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [list-category]
 *          summary: get all categories
 *          parameters:
 *              -   in: header
 *                  example: Bearer token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTMxNDE2OTE1IiwiaWF0IjoxNjcxOTY3MzE0LCJleHAiOjE2NzIwNTM3MTR9.VxlzJojl7pAymc80pEpLIYyRqXd60tMCWrua7Z9hCaY
 *                  name: access-token
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/all", CategoryController.getAllCategory);

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Category]
 *          summary: remove category with ObjectID
 *          parameters:
 *              -   in: header
 *                  example: Bearer token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTMxNDE2OTE1IiwiaWF0IjoxNjcxOTY3MzE0LCJleHAiOjE2NzIwNTM3MTR9.VxlzJojl7pAymc80pEpLIYyRqXd60tMCWrua7Z9hCaY
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.delete("/remove/:id", CategoryController.removeCategory);

/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [list-category]
 *          summary: get all ctegories without populate and nested structure
 *          parameters:
 *              -   in: header
 *                  example: Bearer token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTMxNDE2OTE1IiwiaWF0IjoxNjcxOTY3MzE0LCJleHAiOjE2NzIwNTM3MTR9.VxlzJojl7pAymc80pEpLIYyRqXd60tMCWrua7Z9hCaY
 *                  name: access-token
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/list-of-all", CategoryController.getAllCategoryWithoutPopulate);

/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [list-category]
 *          summary: find category with ID
 *          parameters:
 *              -   in: header
 *                  example: Bearer token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTMxNDE2OTE1IiwiaWF0IjoxNjcxOTY3MzE0LCJleHAiOjE2NzIwNTM3MTR9.VxlzJojl7pAymc80pEpLIYyRqXd60tMCWrua7Z9hCaY
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:id", CategoryController.getCategoryByID);

/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags: [Category]
 *          summary: edit category title with ID
 *          parameters:
 *              -   in: header
 *                  example: Bearer token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MTMxNDE2OTE1IiwiaWF0IjoxNjcxOTY3MzE0LCJleHAiOjE2NzIwNTM3MTR9.VxlzJojl7pAymc80pEpLIYyRqXd60tMCWrua7Z9hCaY
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
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
 *              200:
 *                  description: success
 *              500:
 *                  description: internal server error
 */
router.patch("/update/:id", CategoryController.editCategoryTitle);

module.exports = {
    AdminApiCategoryRouter : router
}
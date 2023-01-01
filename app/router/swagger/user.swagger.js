/**
 * @swagger
 *  components:
 *      schemas:
 *          Update-Profile:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      example: Mehdi
 *                  last_name:
 *                      type: string
 *                      example: Ghorbani
 *                  username:
 *                      type: string
 *                      example: Mehdiqor
 *                  email:
 *                      type: string
 *                      example: mehdighorabanin@gamil.com
 */
/**
 * @swagger
 *  definitions:
 *      ListOfUsers:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      users:
 *                           type: array
 *                           items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "63ad7d9d14556b64712acc67"
 *                                  first_name:
 *                                      type: string
 *                                      example: "Mehdi"
 *                                  last_name:
 *                                      type: string
 *                                      example: "Ghorbani"
 *                                  username:
 *                                      type: string
 *                                      example: "mehdiqor"
 *                                  email:
 *                                      type: string
 *                                      example: "mehdighorabanin@gamil.com"
 *                                  phone:
 *                                      type: string
 *                                      example: 09335316389
 */

/**
 * @swagger
 *  /admin/users/update/{id}:
 *      patch:
 *          tags: [User]
 *          summary: edit and update user profile
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Update-Profile'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Update-Profile'
 *          responses:
 *              200:
 *                  description: user profile updated
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */
/**
 * @swagger
 *  /admin/users/list:
 *      get:
 *          tags: [User]
 *          summary: list of all users
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search with user with <br> first_name, last_name, username, phone, email
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/jason:
 *                          schema:
 *                              $ref: '#/definitions/ListOfUsers'
 */
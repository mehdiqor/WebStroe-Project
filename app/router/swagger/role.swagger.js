/**
 * @swagger
 *  components:
 *      schemas:
 *          Role:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of role
 *                  description:
 *                      type: string
 *                      description: title of role
 *                  permissions:
 *                      type: array
 *                      description: permissionI for role
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Role:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: description of role
 *                  description:
 *                      type: string
 *                      description: title of role
 *                  permissions:
 *                      type: array
 *                      description: permissionI for role
 */
/**
 * @swagger
 *  definitions:
 *      ListOfRoles:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      roles:
 *                           type: array
 *                           items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "63ad7d9d14556b64712acc67"
 *                                  title:
 *                                      type: string
 *                                      example: "title of role"
 *                                  description:
 *                                      type: string
 *                                      example: "description of role"
 *                                  permission:
 *                                      type: string
 *                                      example: "summary of permission"
 *                                  text:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              _id:
 *                                                  type: string
 *                                                  example: "63ad7d9d14556b64712acc67"
 *                                              description:
 *                                                  type: string
 *                                                  example: "describe the permission"
 */

/**
 * @swagger
 *  /admin/roles/create:
 *      post:
 *          tags: [RBAC]
 *          summary: create new role
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Role'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Role'
 *          responses:
 *              201:
 *                  description: new role created
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */
/**
 * @swagger
 *  /admin/roles/update/{id}:
 *      patch:
 *          tags: [RBAC]
 *          summary: edit and update role
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
 *                          $ref: '#/components/schemas/Edit-Role'
 *          responses:
 *              200:
 *                  description: role updated
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */
/**
 * @swagger
 *  /admin/roles/list:
 *      get:
 *          tags: [RBAC]
 *          summary: list of roles
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfRoles'
 */
/**
 * @swagger
 *  /admin/roles/delete/{field}:
 *      delete:
 *          tags: [RBAC]
 *          summary: remove role by field
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: role removed
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */
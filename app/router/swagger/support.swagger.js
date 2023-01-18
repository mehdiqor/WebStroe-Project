/**
 * @swagger
 *  components:
 *      schemas:
 *          Namespace:
 *              type: object
 *              required:
 *                  -   title
 *                  -   endpoint
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of namespace
 *                  endpoint:
 *                      type: string
 *                      description: the endpoint of namespace
 *          Room:
 *              type: object
 *              required:
 *                  -   name
 *                  -   description
 *                  -   namespace
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the title of category
 *                  description:
 *                      type: string
 *                      description: the description of text of blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 *                  namespace:
 *                      type: string
 *                      description: namespace of conversation
 */
/**
 * @swagger
 *  definitions:
 *      ListOfNamespaces:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      namespaces:
 *                           type: array
 *                           items:
 *                              type: object
 *                              properties:
 *                                  title:
 *                                      type: string
 *                                      example: "new namespace"
 *                                  endpoint:
 *                                      type: string
 *                                      example: "teachers"
 */
/**
 * @swagger
 *  definitions:
 *      ListOfRooms:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      rooms:
 *                           type: array
 *                           items:
 *                              type: object
 *                              properties:
 *                                  name:
 *                                      type: string
 *                                      example: "new room"
 *                                  description:
 *                                      type: string
 *                                      example: "text of room"
 *                                  namespace:
 *                                      type: string
 *                                      example: "teachers"
 *                                  image:
 *                                      type: string
 *                                      example: "image address"
 */

/**
 * @swagger
 *  /support/namespace/create:
 *      post:
 *          tags: [Support]
 *          summary: create namespace
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Namespace'
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
 *  /support/namespace/list:
 *      get:
 *          tags: [Support]
 *          summary: get all namespaces
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfNamespaces'
 */
/**
 * @swagger
 *  /support/room/create:
 *      patch:
 *          tags: [Support]
 *          summary: create room
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Room'
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
 *  /support/room/list:
 *      get:
 *          tags: [Support]
 *          summary: get all rooms
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfRooms'
 */

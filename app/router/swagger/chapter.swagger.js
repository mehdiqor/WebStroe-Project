/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *              properties:
 *                  id:
 *                      type: string
 *                      example: 639dccda74ff926f06c2fe21
 *                  title:
 *                      type: string
 *                      example: chapter one
 *                  text:
 *                      type: string
 *                      example: description of chapter
 */
/**
 * @swagger
 *  definitions:
 *      ChaptersOfCourse:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                           type: object
 *                           properties:
 *                              _id:
 *                                  type: string
 *                                  example: "63ad7d9d14556b64712acc67"
 *                              title:
 *                                  type: string
 *                                  example: "title of course"
 *                              chapters:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      example: [{_id: '63aee2dbf2b9fcd6fcb2b35b', title: "title of chapter", text: 'text of chapter'}]
 */

/**
 * @swagger
 *  /admin/chapter/add:
 *      put:
 *          tags: [Chapter]
 *          summary: create new chapter for courses
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
 *          responses:
 *              201:
 *                  description: new course created
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */
/**
 * @swagger
 *  /admin/chapter/list/{courseID}:
 *      get:
 *          tags: [Chapter]
 *          summary: get list of chapters
 *          parameters:
 *              -   in: path
 *                  name: courseID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/ChaptersOfCourse'
 */
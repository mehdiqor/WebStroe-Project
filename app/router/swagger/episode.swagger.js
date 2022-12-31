/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   courseID
 *                  -   chapterID
 *                  -   title
 *                  -   text
 *                  -   type
 *                  -   video
 *              properties:
 *                  courseID:
 *                      type: string
 *                      example: 63affb70d35e8cff7e1a8002
 *                  chapterID:
 *                      type: string
 *                      example: 63b022896d2fd79f352a3649
 *                  title:
 *                      type: string
 *                      example: video number one
 *                  text:
 *                      type: string
 *                      example: description of episode
 *                  type:
 *                      description: select type of episode (lock or unlock)
 *                      enum:
 *                          -   lock
 *                          -   unlock
 *                  video:
 *                      type: string
 *                      description: the file of video
 *                      format: binary
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          EditEpisode:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: video number one
 *                  text:
 *                      type: string
 *                      example: description of episode
 *                  type:
 *                      description: select type of episode (lock or unlock)
 *                      enum:
 *                          -   lock
 *                          -   unlock
 *                  video:
 *                      type: string
 *                      description: the file of video
 *                      format: binary
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
 *  /admin/episode/add:
 *      post:
 *          tags: [Episode]
 *          summary: create new episode for chapter
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddEpisode'
 *          responses:
 *              201:
 *                  description: new episode created
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */
/**
 * @swagger
 *  /admin/episode/edit/{episodeID}:
 *      patch:
 *          tags: [Episode]
 *          summary: update episode
 *          parameters:
 *              -   in: path
 *                  name: episodeID
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/EditEpisode'
 *          responses:
 *              200:
 *                  description: new episode created
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */
/**
 * @swagger
 *  /admin/episode/remove/{episodeID}:
 *      delete:
 *          tags: [Episode]
 *          summary: remove episode by ID
 *          parameters:
 *              -   in: path
 *                  name: episodeID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: episode removed
 *                  content:
 *                      applicatin/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */
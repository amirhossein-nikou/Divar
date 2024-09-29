/**
 * @swagger
 * tags:
 *  name: Option
 *  description: Option management
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          createOption:
 *              type: object
 *              required:
 *                  -   title
 *                  -   type
 *                  -   categoryId
 *                  -   key
 *                  -   guide
 *              properties:
 *                  title:
 *                      type: string
 *                      default: ""
 *                  guide:
 *                      type: string
 *                      default: ""
 *                  categoryId:
 *                      type: string
 *                      default: ""
 *                  key:
 *                      type: string
 *                      default: ""
 *                  required:
 *                      type: boolean
 *                  type:
 *                          enum:
 *                              -   string
 *                              -   number
 *                              -   boolean
 *                              -   array
 *                  list:
 *                      type: array
 *                      items:
 *                          type: string
 *                          default: ""
 *          updateOption:
 *              type: object
 *              required:
 *                  -   optionId
 *              properties:
 *                  optionId:
 *                      type: string
 *                      default: ""
 *                  title:
 *                      type: string
 *                      default: ""
 *                  guide:
 *                      type: string
 *                      default: ""
 *                  categoryId:
 *                      type: string
 *                      default: ""
 *                  key:
 *                      type: string
 *                      default: ""
 *                  required:
 *                      type: boolean
 *                      default: false
 *                  type:
 *                          enum:
 *                              -   string
 *                              -   number
 *                              -   boolean
 *                              -   array
 *                  list:
 *                      type: array
 *                      items:
 *                          type: string
 *                          default: ""
 *              
 */
/**
 * @swagger
 * /option:
 *  post:
 *      summary: this Api use to create option
 *      tags:
 *          -   Option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/createOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/createOption'
 *      responses:
 *          200:
 *              description: created successfully
 * 
 */
/**
 * @swagger
 * /option/by-categoryId/{categoryId}:
 *  get:
 *      summary: get option by category id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: categoryId
 *              type: string
 *      responses:
 *          200:
 *              description: success
 * 
 */
/**
 * @swagger
 * /option/by-categorySlug/{slug}:
 *  get:
 *      summary: get options by category slug 
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: slug
 *              type: string
 *      responses:
 *          200:
 *              description: success
 * 
 */
/**
 * @swagger
 * /option/{id}:
 *  get:
 *      summary: get options by option id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: success
 * 
 */
/**
 * @swagger
 * /option:
 *  get:
 *      summary: get all category options 
 *      tags:
 *          -   Option
 *      responses:
 *          200:
 *              description: success
 * 
 */
/**
 * @swagger
 * /option/{id}:
 *  delete:
 *      summary: delete option by id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: removed successfully
 * 
 */
/**
 * @swagger
 * /option:
 *  put:
 *      summary: this Api use to update option
 *      tags:
 *          -   Option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/updateOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/updateOption'
 *      responses:
 *          200:
 *              description: updated successfully
 * 
 */
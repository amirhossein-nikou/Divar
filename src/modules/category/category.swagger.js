/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category management
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          createCategory:
 *              type: object
 *              required:
 *                  -   name
 *                  -   icon
 *              properties:
 *                  name:
 *                      type: string
 *                  icon:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  parent:
 *                      type: string
 *                  
 *              
 */
/**
 * @swagger
 * /category/create:
 *  post:
 *      summary: this Api use to create category
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/createCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/createCategory'
 *      responses:
 *          200:
 *              description: created successfully
 * 
 */
/**
 * @swagger
 * /category:
 *  get:
 *      summary: get categories
 *      tags:
 *          -   Category
 *      responses:
 *          200:
 *              description: success
 * 
 */
/**
 * @swagger
 * /category/{id}:
 *  delete:
 *      summary: delete category by id
 *      tags:
 *          -   Category
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: removed successfully
 * 
 */
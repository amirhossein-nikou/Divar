const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const httpCodes = require('http-codes');
const CategoryMessage = require("../../common/messages/category.message");
class CategoryController {
    #service
    constructor() {
        autoBind(this)
        this.#service = categoryService
    }
    async create(req, res, next) {
        try {
            const { slug, name, icon, parent } = req.body
            await this.#service.create({ slug, name, icon, parent })
            res.status(httpCodes.CREATED).json(
                {
                    message: CategoryMessage.Created
                }
            )
        } catch (error) {
            next(error)
        }
    }
    async find(req, res, next) {
        try {
            const categories = await this.#service.findAll()
            res.json(categories)
        } catch (error) {
            next(error)
        }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params
            await this.#service.delete(id)
            res.json({
                message: CategoryMessage.Deleted
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new CategoryController()
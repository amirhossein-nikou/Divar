const autoBind = require("auto-bind");
const optionService = require("./option.service");
const httpCodes = require('http-codes');
const OptionMessage = require("../../common/messages/option.message");

class OptionController {
    #service
    constructor() {
        autoBind(this)
        this.#service = optionService
    }
    async create(req, res, next) {
        try {
            const { title, guide, key, list, categoryId, type,required } = req.body;
            await this.#service.create({ title, guide, key, list, categoryId, type,required })
            res.status(httpCodes.CREATED).json({
                message: OptionMessage.Created
            })
        } catch (error) {
            next(error)
        }
    }
    async update(req, res, next) {
        try {
            const { title, guide, key, list, categoryId, type,required, optionId } = req.body;
            await this.#service.update(optionId,{ title, guide, key, list, categoryId, type,required })
            res.status(httpCodes.CREATED).json({
                message: OptionMessage.Updated
            })
        } catch (error) {
            next(error)
        }
    }

    async find(req, res, next) {
        try {
            const result = await this.#service.find()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
    async findById(req, res, next) {
        try {
            const {id} = req.params;
            const result = await this.#service.findById(id)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
       async removeById(req, res, next) {
        try {
            const {id} = req.params;
            const result = await this.#service.removeById(id)
            res.json({
                message: OptionMessage.Removed
            })
        } catch (error) {
            next(error)
        }
    }
    
    async findByCategoryId(req, res, next) {
        try {
            const {categoryId} = req.params;
            const  result = await this.#service.findByCategoryId(categoryId);
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
        async findOptionByCategorySlug(req, res, next) {
        try {
            const {slug} = req.params;
            const  result = await this.#service.findOptionByCategorySlug(slug);
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = new OptionController()
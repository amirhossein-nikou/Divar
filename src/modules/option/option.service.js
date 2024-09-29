const autoBind = require("auto-bind");
const optionModel = require("./option.model");
const createHttpError = require("http-errors");
const OptionMessage = require("../../common/messages/option.message");
const { default: slugify } = require("slugify");
const categoryService = require("../category/category.service");
const { isValidObjectId } = require("mongoose");
class OptionService {
    #model;
    #categoryService
    constructor() {
        autoBind(this)
        this.#model = optionModel
        this.#categoryService = categoryService
    }
    async findOptionByCategorySlug(slug){
        const option = await this.#model.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $addFields:{
                    categoryName: "$category.name",
                    categorySlug: "$category.slug",
                    categoryIcon: "$category.icon",
                }
            },
            {
                $project: {
                    category: 0,
                    __v: 0
                }
            },
            {
                $match: {
                    categorySlug: slug
                }
            }
        ])
        if(option.length == 0){
            throw new createHttpError.NotFound(OptionMessage.NotFoundOption)
        }
        return option[0]
    }
    async findByCategoryId(categoryId) {
        const option = await this.#model.find({categoryId}, {__v:0}).populate([{path:"categoryId", select:{name: 1 , slug:1}}])
        return option
    }
    async findById(id) {
        return await this.#model.findById(id, { __v: 0 })
    }
    async removeById(id) {
        await this.checkExistOptionById(id)
        await this.#model.deleteOne({_id: id})
    }
    async find() {
        return await this.#model.find({}, { __V: 0 }, { sort: { _id: -1 } }).populate([{ path: "categoryId", select: { name: 1, slug: 1 } }]);
    }
    async create(optionDto) {
        let { title, guide, key, list, categoryId, type ,required} = optionDto;
        await this.#categoryService.checkExistsById(categoryId)
        key = slugify(key, { trim: true, lower: true, replacement: "_" })
        await this.checkExistsKeyForCategory(key, categoryId)
        if (list && typeof list === "string") {
            list = list.split(",")
        } else if (!Array.isArray(list)) list = []
        const option = await this.#model.create({ title, guide, key, list, categoryId, type,required })
        return option
    }
    async update(optionId,optionDto) {
        const existOption =await this.checkExistOptionById(optionId)
        let { title, guide, key, list, categoryId, type ,required} = optionDto;
        if(categoryId && isValidObjectId(categoryId)){
            await this.#categoryService.checkExistsById(categoryId)
        }else{categoryId = existOption.categoryId}
        if(key){
            key = slugify(key, { trim: true, lower: true, replacement: "_" })
            await this.checkExistsKeyForCategory(key, categoryId)
        }
        if (list && typeof list === "string") {
            list = list.split(",")
        } else if (!Array.isArray(list)) list = existOption.list
        await this.#model.updateOne({_id: optionId},{$set: { title, guide, key, list, categoryId, type ,required}})
    }

    async checkExistOptionById(id) {
        const option = await this.#model.findById(id);
        if (!option) {
            throw new createHttpError.NotFound(OptionMessage.NotFoundOption)
        }
        return option
    }
    async checkExistsKeyForCategory(key, categoryId) {
        const isExists = await this.#model.findOne({ key, categoryId })
        if (isExists) throw new createHttpError.Conflict(OptionMessage.ExistsKeyForCategory)
        return null
    }

}

module.exports = new OptionService()
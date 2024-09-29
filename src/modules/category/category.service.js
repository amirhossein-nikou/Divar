const autoBind = require("auto-bind");
const { isValidObjectId, Types } = require("mongoose");
const categoryModel = require("./category.model");
const createHttpError = require("http-errors");
const CategoryMessage = require("../../common/messages/category.message");
const { default: slugify } = require("slugify");
const optionModel = require("../option/option.model");

class CategoryService {
    #model;
    #optionModel;
    constructor() {
        autoBind(this)
        this.#model = categoryModel
        this.#optionModel = optionModel
    }
    async create(categoryDto) {
        let { slug, name, parent, icon } = categoryDto
        let parents;
        if (parent && isValidObjectId(parent)) {
            const existParentCAtegory = await this.checkExistsById(parent)
            parents = [
                ... new Set(
                    ([existParentCAtegory._id.toString()].concat(
                        existParentCAtegory.parents.map(id => id.toString())
                    )).map(id => new Types.ObjectId(id))
                )
            ]
        }
        if (slug) {
            await this.checkSlug(slug)
            slug = slugify(slug)
        } else {
            slug = slugify(name)
        }
        const category = await this.#model.create({ slug, name, icon, parent, parents })
    }
    async findAll() {
        return await this.#model.find({ parent: { $exists: false } })
    }
    async delete(id) {
        await this.checkExistsById(id)
        await this.#optionModel.deleteMany({ categoryId: id }).then(async () => {
            await this.#model.deleteOne({ _id: id })
        })
    }
    async checkSlug(slug) {
        const category = await this.#model.findOne({ slug })
        if (category) throw new createHttpError.NotFound(CategoryMessage.NotFound)
        return null
    }
    async checkExistsById(id) {
        const category = await this.#model.findById(id)
        if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound)
        return category
    }
}
module.exports = new CategoryService()
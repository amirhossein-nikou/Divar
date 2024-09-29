const autoBind = require("auto-bind");
const postModel = require("./post.model");
const categoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const CategoryMessage = require("../../common/messages/category.message");
const optionService = require("../option/option.service");
const { Types, isValidObjectId } = require("mongoose");
const PostMessage = require("../../common/messages/post.message");

class PostService {
    #model
    #categoryModel
    #optionService
    constructor() {
        autoBind(this)
        this.#model = postModel
        this.#categoryModel = categoryModel
        this.#optionService = optionService
    }
    async createPostPage(slug) {
        let match = { parent: null }
        let showBack = false
        let options, category;
        if (slug) {
            slug = slug.trim()
            category = await this.#categoryModel.findOne({ slug })
            if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound)
            match = { parent: category._id }
            showBack = true
            options = await this.#optionService.findByCategoryId(category._id)
        }
        const categories = await this.#categoryModel.aggregate([
            {
                $match: match
            }
        ])
        return { categories, showBack, options, category }
    }
    async create(createDto) {
        return this.#model.create(createDto)
    }
    async find(user) {
        if (user && isValidObjectId(user)) {
            return this.#model.find({ user }, {}, { sort: { _id: -1 } })
        }
        throw new createHttpError.BadRequest(PostMessage.InvalidPost)
    }
    async findAll(query) {
        let { category, search } = query
        query = {}
        if (category) {
            const result = await this.#categoryModel.findOne({ slug: category })
            let categories = await this.#categoryModel.find({parents: result._id}, {_id:1})
            // @ts-ignore
            categories = categories.map(item => item._id)
            if (result) {
                query['category'] = {$in:[result._id , ...categories]}
            }else{
                return []
            }
        }
        if (search) {
            search = new RegExp(search,'ig')
            query["$or"] = [
                {title: search},
                {description: search}
            ]
        }
        return this.#model.find(query, {}, { sort: { _id: -1 } })
    }
    async remove(postId) {
        await this.checkExistsById(postId)
        return this.#model.deleteOne({ _id: postId })
    }
    async checkExistsById(postId) {
        if (!postId && !isValidObjectId(postId)) throw new createHttpError.NotFound(PostMessage.InvalidPost)
        const [post] = await this.#model.aggregate([
            {
                $match: { _id: new Types.ObjectId(postId) }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: { path: "$user", preserveNullAndEmptyArrays: true }
            },
            {
                $addFields: {
                    "userMobile": "$user.mobile"
                }
            },
            {
                $project: {
                    user: 0
                }
            }
        ])
        if (!post) throw new createHttpError.NotFound(PostMessage.NotFound)
        return post
    }
}
module.exports = new PostService()
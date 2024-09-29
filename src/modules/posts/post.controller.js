const autoBind = require("auto-bind");
const PostService = require("./post.service");
const httpCodes = require('http-codes');
const PostMessage = require("../../common/messages/post.message");
const { parseBody } = require("../../common/utils/filterBody.utils");
const { decodeOptionKey } = require("../../common/utils/decode.utils");

class PostController {
    #service
    successMessage;
    constructor() {
        autoBind(this)
        this.#service = PostService
        this.successMessage = null
    }
    async createPostPage(req, res, next) {
        try {
            let { slug } = req.query;
            const { categories, showBack, options, category } = await this.#service.createPostPage(slug)
            res.render("./pages/panel/create-post.ejs", { categories, showBack, options, category })
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next) {
        try {
            const images = req.files?.map(image => image?.path?.slice(7))
            const user = req.user?._id
            const { title, description, category, amount } = req.body
            const options = decodeOptionKey(parseBody(req.body, ['title', 'description', 'category', 'images', 'amount']))
            await this.#service.create({
                title, description, category, options, images, user, amount
                , coordinate: [32, 53]
            })
            this.successMessage = PostMessage.Created
            res.redirect("/post/my")
        } catch (error) {
            next(error)
        }
    }
    async find(req, res, next) {
        try {
            const posts = await this.#service.find(req.user?._id)
            res.render("./pages/panel/posts.ejs", { posts, successMessage: this.successMessage })
            this.successMessage = null
        } catch (error) {
            3
            console.log(error);
            next(error)
        }
    }
    async findAllPosts(req, res, next) {
        try {
            const query = req.query
            const posts = await this.#service.findAll(query)
            res.locals.layout = "./layouts/website/main.ejs"
            res.render("./pages/home/index.ejs", {posts})
            this.successMessage = null
        } catch (error) {
            3
            console.log(error);
            next(error)
        }
    }
    async findPost(req, res, next) {
        try {
            const { id } = req.params
            const post = await this.#service.checkExistsById(id)
            res.locals.layout = "./layouts/website/main.ejs"
            return res.render("./pages/home/post.ejs", { post })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    async remove(req, res, next) {
        try {
            const { postId } = req.params
            await this.#service.remove(postId)
            this.successMessage = PostMessage.Deleted
            return res.redirect("/post/my")
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}
module.exports = new PostController()
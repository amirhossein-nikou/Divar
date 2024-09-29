const { Router } = require("express");
const postController = require("./post.controller");
const { upload } = require("../../common/utils/multer.utils");
const AuthGuard = require("../../common/guard/authorization.guard");

const router = Router()
router.get("/create",AuthGuard,postController.createPostPage)
router.post("/new-post",AuthGuard,upload.array("images",10),postController.create)
router.get("/my",AuthGuard,postController.find)
router.get("/:id",postController.findPost)
router.delete("/delete/:postId",AuthGuard,postController.remove)
module.exports = {
    PostRouter: router
}
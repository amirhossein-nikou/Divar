const { Router } = require("express");
const { authRouter } = require("./modules/auth/auth.routes");
const { UserRoutes } = require("./modules/user/user.routes");
const {categoryRoutes} = require("./modules/category/category.routes");
const {optionRoutes} = require("./modules/option/option.routes");
const { PostRouter } = require("./modules/posts/post.routes");
const postController = require("./modules/posts/post.controller");

const router = Router();
router.use("/auth", authRouter)
router.use("/user", UserRoutes)
router.use("/category", categoryRoutes)
router.use("/option", optionRoutes)
router.use("/post", PostRouter)
router.get("/",postController.findAllPosts)
router.get("/panel", (req,res)=>{
    res.locals.layout = "./layouts/panel/main.ejs"
    res.render("./pages/panel/dashboard.ejs")
})
router.get("/auth/login", (req,res)=>{
    res.locals.layout = "./layouts/auth/main.ejs"
    res.render("./pages/auth/login.ejs")
})
module.exports = {
    AllRoutes : router
}

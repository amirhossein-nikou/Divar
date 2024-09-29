const { Router } = require("express");
const AuthGuard = require("../../common/guard/authorization.guard");
const userController = require("./user.controller");
const router = Router()
router.get("/whoami",AuthGuard,userController.whoami)
module.exports = {
    UserRoutes: router
}

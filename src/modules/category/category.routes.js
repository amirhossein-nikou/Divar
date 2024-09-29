const { Router } = require("express");
const categoryController = require("./category.controller");

const router = Router()
router.post("/create",categoryController.create)
router.get("/",categoryController.find)
router.delete("/:id",categoryController.delete)

module.exports = {
    categoryRoutes: router
}
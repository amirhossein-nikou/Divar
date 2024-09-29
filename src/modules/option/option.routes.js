const { Router } = require("express");
const optionController = require("./option.controller");

const router = Router()
router.post("/",optionController.create)
router.put("/",optionController.update)
router.get("/by-categoryId/:categoryId",optionController.findByCategoryId)
router.get("/by-categorySlug/:slug",optionController.findOptionByCategorySlug)
router.get("/:id",optionController.findById)
router.delete("/:id",optionController.removeById)
router.get("/",optionController.find)
module.exports = {
    optionRoutes: router
}
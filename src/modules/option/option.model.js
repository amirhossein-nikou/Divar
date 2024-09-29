const { Schema, Types, model } = require("mongoose");

const OptionSchema = new Schema({
    title: { type: String, required: true },
    key: { type: String, required: true },
    type: { type: String, enum: ["number", "string", "array", "boolean"],required: true },
    list: { type: Array, default: [] },
    guide: { type: String, required: true },
    required: { type: Boolean, required: false,default: false },
    categoryId: { type: Types.ObjectId, required: true, ref: "Category" },
})
const optionModel = model("Option", OptionSchema)
module.exports = optionModel
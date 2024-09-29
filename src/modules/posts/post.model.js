const { Schema, Types, model } = require("mongoose");

const PostSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    amount: {type: Number, required: false},
    category: {type: Types.ObjectId,ref: "Category", required: true},
    province: {type: String, required: false},
    city: {type: String, required: false},
    hood: {type: String, required: false},
    coordinate: {type: [Number], required: true},
    images: {type: [String], required: false,default:[]},
    options: {type: Object,default:{}},
    user: {type: Types.ObjectId ,required:true},
},{timestamps: true})
const postModel = model("Post",PostSchema)
module.exports = postModel
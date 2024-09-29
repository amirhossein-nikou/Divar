const { Schema, model } = require("mongoose")

const OTPSchema = new Schema({
    code: { type: String, require: false, default: undefined },
    expiresIn: { type: Number, require: false, default: 0}
})
const UserSchema = new Schema({
    fullname: {type:String, require: false , },
    mobile: {type:String, require: true , unique: true},
    otp: {type:OTPSchema},
    verifyMobile: {type:Boolean, require: true , default:false},
},{timestamps:true})

const userModel = model("user",UserSchema);
module.exports = userModel
const createHttpError = require("http-errors");
const AuthMessage = require("../messages/auth.message");
const jwt = require('jsonwebtoken');
const userModel = require("../../modules/user/user.model");
async function AuthGuard(req, res, next) {
    try {
        const token = req.cookies?.access_token;
        if (!token) throw new createHttpError.Unauthorized(AuthMessage.TokenNotFound)
        const data = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        if(typeof data == "object" && "id" in data){
            const user = await userModel.findById(data.id,{otp:0,updatedAt:0,__v:0,verifyMobile:0}).lean()
            if(!user) throw new createHttpError.Unauthorized(AuthMessage.NotFoundUser)
            req.user = user
            return next()
        }
        throw new createHttpError.Unauthorized(AuthMessage.TokenNotFound)
    } catch (error) {
        next(error)
    }
}
module.exports = AuthGuard
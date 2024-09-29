const autoBind = require("auto-bind")
const userModel = require("../user/user.model")
const createHttpError = require("http-errors")
const { randomInt } = require('crypto');
const jwt = require('jsonwebtoken');
const AuthMessage = require("../../common/messages/auth.message");
require("dotenv").config()
class AuthService {
    #model
    constructor() {
        autoBind(this)
        this.#model = userModel
    }
    async sendOtp(mobile) {
        const user = await this.#model.findOne({ mobile })
        const now = new Date().getTime();
        const otp = {
            code: randomInt(10000, 99999),
            expiresIn: now + (1000 * 60 * 2) //2 min
        }
        if (!user) {
            //create user
            const newUser = await this.#model.create({ mobile, otp })
            return newUser
        }
        // @ts-ignore
        user.otp = otp
        await user.save()
        return user
    }
    async checkOtp(mobile, code) {
        const user = await this.checkUserByMobile(mobile)
        const now = new Date().getTime()
        if (user.otp?.code !== code) throw createHttpError.Unauthorized(AuthMessage.WrongCode);
        if (user?.otp?.expiresIn < now) throw createHttpError.Unauthorized(AuthMessage.OtpExpires);
        if (!user.verifyMobile) {
            user.verifyMobile = true
            user.save
        }
        const token = this.createToken({mobile: user.mobile, id: user._id})
        return token
    }
    // token
    createToken(payload) {
        return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "1y"
        })
    }


    async checkUserByMobile(mobile) {
        const user = await this.#model.findOne({ mobile })
        if (!user) {
            throw createHttpError.NotFound(AuthMessage.NotFoundUser)
        }
        return user
    }
}

module.exports = new AuthService()
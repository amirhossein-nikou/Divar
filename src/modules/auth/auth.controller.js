const CookieName = require("../../common/constants/cookie.enum");
const NodeEnv = require("../../common/constants/env.enum");
const AuthMessage = require("../../common/messages/auth.message");
const authService = require("./auth.service");
const autoBind = require('auto-bind');

class AuthController{
    #service;
    constructor(){
        autoBind(this)
        this.#service = authService
    }
    async sendOtp(req,res,next){
        try {
            const {mobile} = req.body;
            const result = await this.#service.sendOtp(mobile);
            return res.json({
                message: AuthMessage.SendOtpSuccessfully,
                code: result.otp.code
            })
        } catch (error) {
            next(error)
        }
    }
    async checkOtp(req,res,next){
        try {
            const {mobile,code} = req.body;
            const token = await this.#service.checkOtp(mobile,code);
            return res.cookie(CookieName.AccessToken,token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === NodeEnv.Production
            }).status(200).json({
                message: AuthMessage.Login,
                token
            })
        } catch (error) {
            next(error)
        }
    }
    async logOut(req,res,next){
        try {
            return res.clearCookie(CookieName.AccessToken).status(200).json({
                message: AuthMessage.LogOut,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()
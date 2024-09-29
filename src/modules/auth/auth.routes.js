const { Router } = require("express");
const authController = require("./auth.controller");
const AuthGuard = require("../../common/guard/authorization.guard");
const router = Router();

router.post("/send-otp", authController.sendOtp);
router.post("/check-otp", authController.checkOtp);
router.get("/logout",AuthGuard ,authController.logOut);

module.exports = {
    authRouter: router
}
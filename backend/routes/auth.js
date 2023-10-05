const express = require("express");
const router = express.Router();

const {
    signup,
    signin,
    signout,
    requireSignin,
    forgotPassword,
    resetPassword
} = require("../controllers/auth");
const { userSignupValidator } = require("../validator");
const { 
    forgotPasswordValidator,
    resetPasswordValidator
 } = require("../validators/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.put('/forgot-password', forgotPasswordValidator, forgotPassword);
router.put('/reset-password', resetPasswordValidator,  resetPassword);

module.exports = router;

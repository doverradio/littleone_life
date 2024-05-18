const express = require("express");
const router = express.Router();
const {
    signup,
    signin,
    signout,
    requireSignin,
    forgotPassword,
    resetPassword,
    checkUsernameAvailability,
    googleSignIn,
    googleSignup
} = require("../controllers/auth");
// const { userSignupValidator } = require("../validator");
const { 
    forgotPasswordValidator,
    resetPasswordValidator
 } = require("../validators/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post('/check-username', checkUsernameAvailability);
router.put('/forgot-password', forgotPasswordValidator, forgotPassword);
router.put('/reset-password', resetPasswordValidator,  resetPassword);
router.post('/google-login', googleSignIn); // https://littleone.life/api/google/callback
router.post('/google-signup', googleSignup); // For new users completing the sign-up process with Google

module.exports = router;

// backend/routes/auth.js

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
    googleSignin,
    googleSignup,
    checkSession,  // Import the checkSession controller
    refreshToken
} = require("../controllers/auth");
const { 
    forgotPasswordValidator,
    resetPasswordValidator
} = require("../validators/auth");

const oauth2Client = require('../config/googleConfig');
const SCOPES = [
    'https://www.googleapis.com/auth/drive.file'
];

// Existing auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post('/check-username', checkUsernameAvailability);
router.put('/forgot-password', forgotPasswordValidator, forgotPassword);
router.put('/reset-password', resetPasswordValidator, resetPassword);
router.post('/google-login', googleSignin);
router.post('/google-signup', googleSignup);

// New route to check if the user is authenticated based on the session
router.get('/check-session', checkSession);

// Redirect to Google's OAuth 2.0 server to initiate authentication
router.get('/google', (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    res.redirect(authUrl);
});

// Handle the OAuth 2.0 server response
router.get('/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        // Save tokens to the user's session or database
        req.session.tokens = tokens;
        res.redirect('/');
    } catch (error) {
        console.error('Error during OAuth callback:', error);
        res.status(500).send('Authentication failed');
    }
});

// Refresh Token Route (optional, depending on how you want to handle refresh tokens)
router.post('/refresh-token', refreshToken);

module.exports = router;

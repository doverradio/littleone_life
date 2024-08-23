const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email');
const { requireSignin, authMiddleware, adminMiddleware, isAuth, isAdmin } = require('../controllers/auth');

// POST endpoint to send email
router.post('/send-email', requireSignin, authMiddleware, adminMiddleware, isAuth, emailController.sendEmail);

module.exports = router;

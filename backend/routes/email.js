const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email');

// POST endpoint to send email
router.post('/send-email', emailController.sendEmail);

module.exports = router;

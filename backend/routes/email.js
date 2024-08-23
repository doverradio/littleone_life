const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controllers/email');

// POST endpoint to send email
router.post('/email/send-email', sendEmail);

module.exports = router;

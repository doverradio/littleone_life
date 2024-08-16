// /routes/ai.js
const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, isAuth } = require('../controllers/auth');
const aiController = require('../controllers/ai');

// Protect the routes with requireSignin, authMiddleware, and isAuth
router.post('/ai/interact', requireSignin, authMiddleware, isAuth, aiController.handleInteraction);
router.get('/ai/chat-history', requireSignin, authMiddleware, isAuth, aiController.getChatHistory);  // New route

module.exports = router;

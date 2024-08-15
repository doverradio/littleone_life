const express = require('express');
const router = express.Router();
const { isAdmin, authMiddleware, requireSignin } = require('../controllers/auth');
const { getAllUsers, updateUserRole, sendNotificationEmail } = require('../controllers/admin');

// Get all users
router.get('/users', requireSignin, authMiddleware, isAdmin, getAllUsers);

// Update user role
router.put('/user/:userId/role', requireSignin, isAdmin, updateUserRole);

// Send notification email
router.post('/send-email', requireSignin, isAdmin, sendNotificationEmail);

module.exports = router;

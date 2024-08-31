const express = require('express');
const router = express.Router();
const { toggleNotification, disableNotification, getNotificationPreferences } = require('../controllers/notification');
const { requireSignin, authMiddleware, isAuth } = require('../controllers/auth');

// Route to toggle notification (Protected Route)
router.post('/toggle-notification', requireSignin, authMiddleware, isAuth, toggleNotification);

// Route to disable notification via email link (Public Route)
router.get('/disable-notifications', requireSignin, authMiddleware, disableNotification);

// Route to get user notification preferences
router.post('/user/notification-preferences', requireSignin, authMiddleware, getNotificationPreferences);

module.exports = router;
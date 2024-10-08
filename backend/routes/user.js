const express = require('express');
const router = express.Router();
const { 
    updatePrayerSettings, 
    getPrayerSettings, 
    getUserSettings, 
    updateUserSettings, 
    getUserPrayerStats,
    getUserTokenUsage,
    getUserById,
    getNotificationPreferences

} = require('../controllers/user'); // Adjust the path according to your project structure
const { requireSignin, isAuth } = require('../controllers/auth');

// Update prayer settings
router.put('/user/update-prayer-settings', updatePrayerSettings);
router.post('/user/prayer-settings', requireSignin, isAuth, getPrayerSettings);
router.post('/user/settings', requireSignin, getUserSettings);
router.put('/user/settings', 
    // requireSignin, 
    updateUserSettings
);
router.get('/user/token-usage/:userId', requireSignin, isAuth, getUserTokenUsage);

// Dashboard User Stats
router.get('/user/stats/:userId', requireSignin, isAuth, getUserPrayerStats);

// Route to get user by ID
router.get('/user/:userId', requireSignin, isAuth, getUserById);


// Route to get user notification preferences
router.post('/user/notification-preferences', requireSignin, isAuth, getNotificationPreferences);

module.exports = router;

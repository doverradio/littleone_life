const express = require('express');
const router = express.Router();
const { updatePrayerSettings, getPrayerSettings } = require('../controllers/user'); // Adjust the path according to your project structure
const { requireSignin, authMiddleware, adminMiddleware, isAuth, isAdmin } = require('../controllers/auth');

// Update prayer settings
router.put('/user/update-prayer-settings', updatePrayerSettings);
router.post('/user/prayer-settings', requireSignin, authMiddleware, isAuth, getPrayerSettings);

module.exports = router;

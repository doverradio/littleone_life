const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware, isAuth, isAdmin } = require('../controllers/auth');
const {
    createPrayer,
    getUserPrayerCount,
    getPrayer,
    getAllPrayers,
    updatePrayer,
    deletePrayer,
    getTypeCount,
    getUserPrayers,
    deletePrayers,
    getUserPrayerStats
} = require('../controllers/prayer');

router.post('/prayer/create', requireSignin, authMiddleware, isAuth, createPrayer);
router.post('/prayer/count', requireSignin, authMiddleware, isAuth, getUserPrayerCount);
router.post('/prayer/get', requireSignin, authMiddleware, isAuth, getPrayer);
router.post('/prayers', requireSignin, authMiddleware, isAuth, getAllPrayers);
router.post('/prayer/update', requireSignin, authMiddleware, isAuth, updatePrayer);
router.post('/prayer/delete', requireSignin, authMiddleware, isAuth, deletePrayer);

// For Charts
router.post('/prayer/prayer-count', requireSignin, authMiddleware, isAuth, getTypeCount)

// For Data Table
router.post('/prayer/user-prayers', requireSignin, authMiddleware, isAuth, getUserPrayers);
router.delete('/prayer/delete-prayers', requireSignin, authMiddleware, isAuth, deletePrayers); // Route for deleting prayers from data table

// New route for user prayer stats
router.post('/prayer/user-stats', requireSignin, authMiddleware, isAuth, getUserPrayerStats);

module.exports = router;

const express = require('express');
const router = express.Router();
const { requireSignin, isAuth } = require('../controllers/auth');
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

router.post('/prayer/create', requireSignin, isAuth, createPrayer);
router.post('/prayer/count', requireSignin, isAuth, getUserPrayerCount);
router.post('/prayer/get', requireSignin, isAuth, getPrayer);
router.post('/prayers', requireSignin, isAuth, getAllPrayers);
router.post('/prayer/update', requireSignin, isAuth, updatePrayer);
router.post('/prayer/delete', requireSignin, isAuth, deletePrayer);

// For Charts
router.post('/prayer/prayer-count', requireSignin, isAuth, getTypeCount)

// For Data Table
router.post('/prayer/user-prayers', requireSignin, isAuth, getUserPrayers);
router.delete('/prayer/delete-prayers', requireSignin, isAuth, deletePrayers); // Route for deleting prayers from data table

// New route for user prayer stats
router.post('/prayer/user-stats', requireSignin, isAuth, getUserPrayerStats);

module.exports = router;

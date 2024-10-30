const express = require('express');
const router = express.Router();
const { requireSignin, isAuth } = require('../controllers/auth');
const {
    createIntention,
    getAllIntentions,
    getIntentionById,
    updateIntention,
    deleteIntention
} = require('../controllers/intentions');

// Middleware to protect routes, if you have one (e.g., isAuthenticated)
// const { isAuthenticated } = require('../middlewares/auth');

// Routes
router.post('/intention', requireSignin, isAuth, createIntention); // Create a new intention
router.post('/intentions', requireSignin, isAuth, getAllIntentions); // Get all intentions for a user
router.post('/intention/getintention', requireSignin, isAuth, getIntentionById); // Get a single intention by ID
router.put('/intention/update', requireSignin, isAuth, updateIntention); // Update an intention
router.delete('/intention/delete', requireSignin, isAuth, deleteIntention); // Delete an intention

module.exports = router;

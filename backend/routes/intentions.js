const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware, isAuth, isAdmin } = require('../controllers/auth');
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
router.post('/intention', requireSignin, authMiddleware, isAuth, createIntention); // Create a new intention
router.post('/intentions', requireSignin, authMiddleware, isAuth, getAllIntentions); // Get all intentions for a user
router.post('/intention/:id', requireSignin, authMiddleware, isAuth, getIntentionById); // Get a single intention by ID
router.put('/intention/:id', requireSignin, authMiddleware, isAuth, updateIntention); // Update an intention
router.delete('/intention/:id', requireSignin, authMiddleware, isAuth, deleteIntention); // Delete an intention

module.exports = router;

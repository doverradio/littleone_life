const express = require('express');
const router = express.Router();
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
router.post('/intention', createIntention); // Create a new intention
router.post('/intentions', getAllIntentions); // Get all intentions for a user
router.post('/intention/:id', getIntentionById); // Get a single intention by ID
router.put('/intention/:id', updateIntention); // Update an intention
router.delete('/intention/:id', deleteIntention); // Delete an intention

module.exports = router;

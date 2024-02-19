const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, authMiddleware } = require('../controllers/auth');
const { 
    createConfession, 
    countConfessionsByUser,
    getAllConfessions,
    getConfessionById,
    updateConfession,
    deleteConfession,
    getUserConfessions,
    deleteConfessions
} = require('../controllers/confession');

// Create a new confession
router.post('/confession/create', requireSignin, authMiddleware, isAuth, createConfession);

// Count confessions by user
router.post('/confession/count', requireSignin, authMiddleware, isAuth, countConfessionsByUser);

// Get all confessions for a user
router.post('/confession/all', requireSignin, authMiddleware, isAuth, getAllConfessions);

// Get a single confession by ID
router.post('/confession/single', requireSignin, authMiddleware, isAuth, getConfessionById);

// Update a confession
router.post('/confession/update', requireSignin, authMiddleware, isAuth, updateConfession);

// Delete a confession
router.post('/confession/delete', requireSignin, authMiddleware, isAuth, deleteConfession);


// Datatable
router.post('/confession/user-confessions', requireSignin, authMiddleware, isAuth, getUserConfessions);
router.delete('/confession/delete-confessions', requireSignin, authMiddleware, isAuth, deleteConfessions);


module.exports = router;

const express = require('express');
const router = express.Router();

const { requireSignin, isAuth } = require('../controllers/auth');
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
router.post('/confession/create', 
    requireSignin, 
    isAuth, 
    createConfession);

// Count confessions by user
router.post('/confession/count', requireSignin, isAuth, countConfessionsByUser);

// Get all confessions for a user
router.post('/confession/all', requireSignin, isAuth, getAllConfessions);

// Get a single confession by ID
router.post('/confession/single', requireSignin, isAuth, getConfessionById);

// Update a confession
router.post('/confession/update', requireSignin, isAuth, updateConfession);

// Delete a confession
router.post('/confession/delete', requireSignin, isAuth, deleteConfession);


// Datatable
router.post('/confession/user-confessions', requireSignin, isAuth, getUserConfessions);
router.delete('/confession/delete-confessions', requireSignin, isAuth, deleteConfessions);


module.exports = router;

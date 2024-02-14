// routes/rosary.js

const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware, isAuth, isAdmin } = require('../controllers/auth');
const {
    createRosary,
    getRosary,
    getAllRosaries,
    updateRosary,
    deleteRosary,
    getRosaryHistory,
    getUserRosaryCount
} = require('../controllers/rosary');

router.post('/rosary/create', requireSignin, authMiddleware, isAuth, createRosary);
router.post('/rosary/count', requireSignin, authMiddleware, isAuth, getUserRosaryCount);
router.post('/rosary/get', requireSignin, authMiddleware, isAuth, getRosary);
router.post('/rosaries', requireSignin, authMiddleware, isAuth, getAllRosaries);
router.post('/rosary/update', requireSignin, authMiddleware, isAuth, updateRosary);
router.post('/rosary/delete', requireSignin, authMiddleware, isAuth, deleteRosary);
router.post('/rosary/history', requireSignin, authMiddleware, isAuth, getRosaryHistory);

module.exports = router;

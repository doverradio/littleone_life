// routes/rosary.js

const express = require('express');
const router = express.Router();
const {
    createRosary,
    getRosary,
    getAllRosaries,
    updateRosary,
    deleteRosary,
    getRosaryHistory,
    getUserRosaryCount
} = require('../controllers/rosary');

router.post('/rosary/create', createRosary);
router.post('/rosary/count', getUserRosaryCount);
router.post('/rosary/get', getRosary);
router.post('/rosaries', getAllRosaries);
router.post('/rosary/update', updateRosary);
router.post('/rosary/delete', deleteRosary);
router.post('/rosary/history', getRosaryHistory);

module.exports = router;

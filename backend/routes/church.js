const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware, isAuth, isAdmin } = require('../controllers/auth');
const {
    createChurch,
    getAllChurches,
    getChurchById,
    updateChurch,
    deleteChurch
} = require('../controllers/church');

router.post('/church/create', requireSignin, authMiddleware, isAuth, createChurch);
router.post('/churches', requireSignin, authMiddleware, isAuth, getAllChurches);
router.post('/church/get', requireSignin, authMiddleware, isAuth, getChurchById);
router.put('/church/update', requireSignin, authMiddleware, isAuth, updateChurch);
router.delete('/church/delete', requireSignin, authMiddleware, isAuth, deleteChurch);

module.exports = router;

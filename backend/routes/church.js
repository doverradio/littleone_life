const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, isAuth, isAdmin } = require('../controllers/auth');
const {
    createChurch,
    getAllChurches,
    getChurchById,
    updateChurch,
    deleteChurch,
    addChurchesToUser,
    getChurchesByZipCode,
    addUserToChurch,
    removeChurchFromUser // Add this
} = require('../controllers/church');

router.post('/church/create', requireSignin, authMiddleware, isAuth, createChurch);
router.post('/churches', requireSignin, authMiddleware, isAuth, getAllChurches);
router.post('/church/get', requireSignin, authMiddleware, isAuth, getChurchById);
router.put('/church/update', requireSignin, authMiddleware, isAuth, updateChurch);
router.delete('/church/delete', requireSignin, authMiddleware, isAuth, deleteChurch);
router.post('/churches/addToUser', requireSignin, authMiddleware, isAuth, addChurchesToUser); 
router.post('/churches/removeFromUser', requireSignin, authMiddleware, isAuth, removeChurchFromUser); // New route
router.post('/churches/by-zip', requireSignin, authMiddleware, isAuth, getChurchesByZipCode);
router.post('/church/zipcode', getChurchesByZipCode);
router.post('/church/add-user', requireSignin, authMiddleware, isAuth, addUserToChurch);

module.exports = router;

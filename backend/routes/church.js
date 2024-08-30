const express = require('express');
const router = express.Router();
const { requireSignin, isAuth } = require('../controllers/auth');
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

router.post('/church/create', requireSignin, isAuth, createChurch);
router.post('/churches', requireSignin, isAuth, getAllChurches);
router.post('/church/get', requireSignin, isAuth, getChurchById);
router.put('/church/update', requireSignin, isAuth, updateChurch);
router.delete('/church/delete', requireSignin, isAuth, deleteChurch);
router.post('/churches/addToUser', requireSignin, isAuth, addChurchesToUser); 
router.post('/churches/removeFromUser', requireSignin, isAuth, removeChurchFromUser); // New route
router.post('/churches/by-zip', requireSignin, isAuth, getChurchesByZipCode);
router.post('/church/zipcode', getChurchesByZipCode);
router.post('/church/add-user', requireSignin, isAuth, addUserToChurch);

module.exports = router;

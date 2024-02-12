const express = require('express');
const router = express.Router();
const {
    createChurch,
    getAllChurches,
    getChurchById,
    updateChurch,
    deleteChurch
} = require('../controllers/church');

router.post('/church/create', createChurch);
router.post('/churches', getAllChurches);
router.post('/church/get', getChurchById);
router.put('/church/update', updateChurch);
router.delete('/church/delete', deleteChurch);

module.exports = router;

const express = require('express');
const router = express.Router();
const { createPrayerSpace, joinPrayerSpace, getPrayerSpace } = require('../controllers/prayerSpaces');

router.post('/prayerSpaces/create', createPrayerSpace);
router.post('/prayerSpaces/join', joinPrayerSpace);
router.get('/prayerSpaces/:id', getPrayerSpace);

module.exports = router;

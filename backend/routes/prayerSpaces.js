const express = require('express');
const router = express.Router();
const { createPrayerSpace, joinPrayerSpace, getPrayerSpace } = require('../controllers/prayerSpaces');

router.post('/create', createPrayerSpace);
router.post('/join', joinPrayerSpace);
router.get('/:id', getPrayerSpace);

module.exports = router;

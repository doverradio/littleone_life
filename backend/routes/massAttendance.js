const express = require('express');
const router = express.Router();
const { 
    createMassAttendance, 
    getAllMassAttendances, 
    updateMassAttendance, 
    deleteMassAttendance,
    countMassesByUser,
    getMassAttendanceByUser
} = require('../controllers/massAttendance');

router.post('/mass-attendance/create', createMassAttendance);
router.post('/mass-attendance/count', countMassesByUser);
router.post('/mass-attendance', getMassAttendanceByUser);
router.post('/mass-attendances', getAllMassAttendances);
router.put('/mass-attendance/update', updateMassAttendance);
router.delete('/mass-attendance/delete', deleteMassAttendance);

module.exports = router;

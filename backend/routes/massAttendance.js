const express = require('express');
const router = express.Router();
const { requireSignin, authMiddleware, adminMiddleware, isAuth, isAdmin } = require('../controllers/auth');
const { 
    createMassAttendance, 
    getAllMassAttendances, 
    updateMassAttendance, 
    deleteMassAttendance,
    countMassesByUser,
    getMassAttendanceByUser,
    getUserMasses,
    deleteMassAttendances
} = require('../controllers/massAttendance');

router.post('/mass-attendance/create', requireSignin, authMiddleware, isAuth, createMassAttendance);
router.post('/mass-attendance/count', requireSignin, authMiddleware, isAuth, countMassesByUser);
router.post('/mass-attendance', requireSignin, authMiddleware, isAuth, getMassAttendanceByUser);
router.post('/mass-attendances', requireSignin, authMiddleware, isAuth, getAllMassAttendances);
router.put('/mass-attendance/update', requireSignin, authMiddleware, isAuth, updateMassAttendance);
router.delete('/mass-attendance/delete', requireSignin, authMiddleware, isAuth, deleteMassAttendance);

// Datatable
router.post('/mass/user-masses', requireSignin, authMiddleware, isAuth, getUserMasses);
router.delete('/mass/delete-masses', requireSignin, authMiddleware, isAuth, deleteMassAttendances); // Route for deleting rosaries from data table

module.exports = router;

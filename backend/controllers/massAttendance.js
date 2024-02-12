const MassAttendance = require('../models/massAttendance'); // Adjust the path as necessary
// Include other models if needed, e.g., User or Church

exports.createMassAttendance = async (req, res) => {
    try {
        const massAttendance = new MassAttendance(req.body);
        await massAttendance.save();
        res.status(201).json(massAttendance);
    } catch (error) {
        res.status(400).json({ error: "Unable to record mass attendance" });
    }
};

exports.countMassesByUser = async (req, res) => {
    const { userId } = req.body; // Assuming the user ID is passed as a URL parameter

    try {
        const count = await MassAttendance.countDocuments({ user: userId });
        res.json({ userId: userId, massAttendanceCount: count });
    } catch (error) {
        res.status(400).json({ error: "Error fetching mass attendance count" });
    }
};

exports.getMassAttendanceByUser = async (req, res) => {
    const { userId, massId } = req.body;
    try {
        const massAttendance = await MassAttendance.findOne({ _id: massId, user: userId }).populate('user').populate('church');
        if (!massAttendance) {
            return res.status(404).json({ error: "Mass attendance not found" });
        }
        res.json(massAttendance);
    } catch (error) {
        res.status(400).json({ error: "Error fetching mass attendance" });
    }
};


exports.getAllMassAttendances = async (req, res) => {
    const { userId } = req.body;
    try {
        const massAttendances = await MassAttendance.find({user: userId}).populate('user').populate('church');
        res.json(massAttendances);
    } catch (error) {
        res.status(400).json({ error: "Unable to retrieve mass attendances" });
    }
};

exports.updateMassAttendance = async (req, res) => {
    const { massId } = req.body;
    try {
        const massAttendance = await MassAttendance.findByIdAndUpdate(massId, req.body, { new: true });
        res.json(massAttendance);
    } catch (error) {
        res.status(400).json({ error: "Unable to update mass attendance" });
    }
};

exports.deleteMassAttendance = async (req, res) => {
    const { massId } = req.body;
    try {
        await MassAttendance.findByIdAndDelete(massId);
        res.json({ message: "Mass attendance deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Unable to delete mass attendance" });
    }
};


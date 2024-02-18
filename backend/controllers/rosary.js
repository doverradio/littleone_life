const Rosary = require("../models/rosary"); // Adjust the path according to your structure
const mongoose = require('mongoose');
const log = console.log;

// Create a new Rosary
exports.createRosary = async (req, res) => {
    let { userId, mystery, intentions } = req.body;

    let rosaryObj = {
        m: mystery,
        i: intentions,
        user: userId,
    }
    const rosary = new Rosary(rosaryObj);

    try {
        await rosary.save();
        res.status(201).json({result: `success!`});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller to get the number of rosaries prayed by a user
exports.getUserRosaryCount = async (req, res) => {
    const userId = req.body.userId; // Assuming you're sending userId in the request body

    try {
        const count = await Rosary.countDocuments({ user: userId });
        res.json({ rosaryCount: count });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read a single Rosary by ID
exports.getRosary = async (req, res) => {
    try {
        const rosary = await Rosary.findById(req.params.id);
        if (!rosary) {
            return res.status(404).json({ error: "Rosary not found" });
        }
        res.json(rosary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read all Rosaries
exports.getAllRosaries = async (req, res) => {
    try {
        const rosaries = await Rosary.find();
        res.json(rosaries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getRosaryHistory = async (req, res) => {
    try {
        const userId = req.body.userId; // Assuming you send the user ID in the body. It's more common to send it as a parameter or token payload.
        const rosaries = await Rosary.find({ user: userId });
        res.json(rosaries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Update a Rosary
exports.updateRosary = async (req, res) => {
    try {
        const rosary = await Rosary.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!rosary) {
            return res.status(404).json({ error: "Rosary not found" });
        }
        res.json(rosary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a Rosary
exports.deleteRosary = async (req, res) => {
    try {
        const rosary = await Rosary.findByIdAndDelete(req.params.id);
        if (!rosary) {
            return res.status(404).json({ error: "Rosary not found" });
        }
        res.json({ message: "Rosary deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// For Charts
exports.getMysteryCount = async (req, res) => {
    let { userId } = req.body;
    try {
        const counts = await Rosary.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: "$m", count: { $sum: 1 } } }
        ]);
        res.json(counts);
    } catch (err) {
        log(`getMysteryCount err: `, err)
        res.status(400).send("Error getting mystery counts");
    }
};

exports.getUserRosaries = async (req, res) => {
    try {
        const { userId, page, limit } = req.body;
        const userRosaries = await Rosary.find({ user: userId })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('i', 'content') // Adjust based on what details you want from Intention
            .exec();

        const total = await Rosary.countDocuments({ user: userId });

        res.json({ rosaries: userRosaries, total });
    } catch (error) {
        console.error('Error fetching user rosaries:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteRosaries = async (req, res) => {
    try {
        // Extract the IDs from the request body
        const { rowsToDelete } = req.body;

        // Delete the documents with the provided IDs
        await Rosary.deleteMany({ _id: { $in: rowsToDelete } });

        res.status(200).json({
            message: 'Rosaries deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting rosaries',
            error: error.message
        });
    }
};
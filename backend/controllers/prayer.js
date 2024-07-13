const Prayer = require("../models/prayer"); // Adjust the path according to your structure
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const log = console.log;

// Create a new Prayer
exports.createPrayer = async (req, res) => {
    const { userId, type, intentions } = req.body;

    let prayerObj = {
        user: userId,
        type: type,
        intentions: intentions
    };

    const prayer = new Prayer(prayerObj);

    try {
        await prayer.save();
        res.status(201).json({ result: `Prayer created successfully!` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get the number of prayers by a user
exports.getUserPrayerCount = async (req, res) => {
    const userId = req.body.userId;

    try {
        const count = await Prayer.countDocuments({ user: userId });
        res.json({ prayerCount: count });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read a single Prayer by ID
exports.getPrayer = async (req, res) => {
    try {
        const prayer = await Prayer.findById(req.params.id);
        if (!prayer) {
            return res.status(404).json({ error: "Prayer not found" });
        }
        res.json(prayer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read all Prayers
exports.getAllPrayers = async (req, res) => {
    try {
        const prayers = await Prayer.find();
        res.json(prayers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a Prayer
exports.updatePrayer = async (req, res) => {
    try {
        const prayer = await Prayer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!prayer) {
            return res.status(404).json({ error: "Prayer not found" });
        }
        res.json(prayer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a Prayer
exports.deletePrayer = async (req, res) => {
    try {
        const prayer = await Prayer.findByIdAndDelete(req.params.id);
        if (!prayer) {
            return res.status(404).json({ error: "Prayer not found" });
        }
        res.json({ message: "Prayer deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Adaptation for Charts (If applicable to your Prayer model)
exports.getTypeCount = async (req, res) => {
    let { userId } = req.body;
    try {
        const counts = await Prayer.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: "$type", count: { $sum: 1 } } }
        ]);
        res.json(counts);
    } catch (err) {
        log(`getTypeCount err: `, err)
        res.status(400).send("Error getting type counts");
    }
};

exports.getUserPrayers = async (req, res) => {
    try {
        const { userId, page, limit, type } = req.body;
        const userPrayers = await Prayer.find({ user: userId, type })
            .skip((page - 1) * limit)
            .limit(limit)
            // Adjust the populate if you have intentions or other references
            .exec();

        const total = await Prayer.countDocuments({ user: userId, type });

        res.json({ prayers: userPrayers, total });
    } catch (error) {
        console.error('Error fetching user prayers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deletePrayers = async (req, res) => {
    try {
        const { rowsToDelete } = req.body;
        await Prayer.deleteMany({ _id: { $in: rowsToDelete } });
        res.status(200).json({
            message: 'Prayers deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting prayers',
            error: error.message
        });
    }
};

// Get the number of prayers by type for a user
exports.getUserPrayerStats = async (req, res) => {
    const userId = req.body.userId;

    try {
        const prayerStats = await Prayer.aggregate([
            { $match: { user: new ObjectId(userId) } },
            { $group: { _id: "$type", count: { $sum: 1 } } }
        ]);

        const stats = prayerStats.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {});

        res.json({
            rosaries: stats.rosary || 0,
            masses: stats.mass || 0,
            confessions: stats.confession || 0,
            divineMercies: stats.divineMercy || 0
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
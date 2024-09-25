const Confession = require('../models/confession'); // Import the Confession model
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const log = console.log;

// Create a new confession
exports.createConfession = async (req, res) => {
    try {
        let { user, church, confessionTime } = req.body
        const confessionData = { user, church, confessionTime };

        // Validate user and church IDs are ObjectId instances
        if (!mongoose.Types.ObjectId.isValid(confessionData.user) || !mongoose.Types.ObjectId.isValid(confessionData.church)) {
            return res.status(400).json({ error: "Invalid user or church ID" });
        }

        // Create new confession document
        const newConfession = new Confession(confessionData);

        // Save to the database
        await newConfession.save();

        res.status(201).json(newConfession);
    } catch (error) {
        log(`Error in createConfession: `, error);
        res.status(400).json({ error: error.message });
    }
};

exports.countConfessionsByUser = async (req, res) => {
    const { userId } = req.body; // Assuming the user ID is passed as a parameter

    try {
        const count = await Confession.countDocuments({ user: userId });
        res.json({ userId: userId, confessionCount: count });
    } catch (error) {
        res.status(400).json({ error: "Error fetching confession count" });
    }
};

// Get all confessions for a user
exports.getAllConfessions = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const confessions = await Confession.find({ user: userId }).populate('church');
        res.json(confessions);
    } catch (error) {
        console.error("Error in getAllConfessions:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get a single confession by ID
exports.getConfessionById = async (req, res) => {
    try {
        const { _id } = req.body;
        const confession = await Confession.findById(_id).populate('church');
        if (!confession) {
            return res.status(404).json({ error: 'Confession not found' });
        }
        res.json(confession);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a confession
exports.updateConfession = async (req, res) => {
    try {
        const { _id } = req.body;
        const confession = await Confession.findByIdAndUpdate(_id, req.body, { new: true });
        if (!confession) {
            return res.status(404).json({ error: 'Confession not found' });
        }
        res.json(confession);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a confession
exports.deleteConfession = async (req, res) => {
    try {
        const { _id } = req.body;
        const confession = await Confession.findByIdAndDelete(_id);
        if (!confession) {
            return res.status(404).json({ error: 'Confession not found' });
        }
        res.json({ message: 'Confession deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserConfessions = async (req, res) => {
    try {
        const { userId, page, limit } = req.body;

        // Fetch confessions with pagination
        const userConfessions = await Confession.find({ user: userId })
            .populate('church')
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        // Transform the userConfessions
        const formattedConfessions = userConfessions.map(confession => {
            let newChurch = confession.church && confession.church.name ? confession.church.name : 'Unknown Church';
            return {
                ...confession.toObject(), // Convert Mongoose document to a plain JavaScript object
                church: newChurch
            };
        });

        // Get total count for pagination
        const total = await Confession.countDocuments({ user: userId });

        res.json({ confessions: formattedConfessions, total });
    } catch (error) {
        console.error('Error fetching user confessions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteConfessions = async (req, res) => {
    try {
        // Extract the IDs of the confessions to delete from the request body
        const { rowsToDelete } = req.body;

        // Delete the Confession documents with the provided IDs
        await Confession.deleteMany({ _id: { $in: rowsToDelete } });

        res.status(200).json({
            message: 'Confessions deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting confessions',
            error: error.message
        });
    }
};
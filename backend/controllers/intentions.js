const Intention = require('../models/intention'); // Import the Intention model
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const log = console.log;

// Create a new intention
exports.createIntention = async (req, res) => {
    try {
        const { user, content, type } = req.body;

        // Validate user ID
        if (!mongoose.isValidObjectId(user)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        // Create intention
        const intentionData = { user, content, type };
        const newIntention = new Intention(intentionData);
        await newIntention.save();
        res.status(201).json(newIntention);
    } catch (error) {
        log(`Error in createIntention: `, error); // More detailed error log
        res.status(400).json({ error: error.message });
    }
};


// Get all intentions for a user
exports.getAllIntentions = async (req, res) => {
    try {
        const { userId, type } = req.body;
        // log("Received userId:", userId);
        // log("Received type:", type);

        // Validate userId
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const intentions = await Intention.find({ user: userId, type });
        log("Fetched Intentions:", intentions);

        res.json(intentions);
    } catch (error) {
        console.error("Error in getAllIntentions:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get a single intention by ID
exports.getIntentionById = async (req, res) => {
    try {
        const { _id } = req.body;
        const intention = await Intention.findById(_id);
        if (!intention) {
            return res.status(404).json({ error: 'Intention not found' });
        }
        res.json(intention);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an intention
exports.updateIntention = async (req, res) => {
    try {
        const { _id, content } = req.body;

        // Ensure _id and content are provided
        if (!_id || !content) {
            return res.status(400).json({ error: 'Missing required fields (_id, content)' });
        }

        const intention = await Intention.findById(_id);
        if (!intention) {
            return res.status(404).json({ error: 'Intention not found' });
        }

        intention.content = content;
        await intention.save();

        res.json(intention);
    } catch (error) {
        console.error('Error updating intention:', error);
        res.status(400).json({ error: error.message });
    }
};


// Delete an intention
exports.deleteIntention = async (req, res) => {
    console.log('Token:', req.headers.authorization); // Log the token to debug
    try {
        const { _id } = req.body;
        const intention = await Intention.findByIdAndDelete(_id);
        if (!intention) {
            return res.status(404).json({ error: 'Intention not found' });
        }
        res.json({ message: 'Intention deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

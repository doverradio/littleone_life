const Intention = require('../models/intention'); // Import the Intention model
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const log = console.log;

// Create a new intention
exports.createIntention = async (req, res) => {
    log(`Begin createIntention! req.body: `, req.body);
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
        // console.log("Received userId:", userId);

        // Validate userId
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const intentions = await Intention.find({ user: userId, type });
        // console.log("Intentions:", intentions);

        res.json(intentions);
    } catch (error) {
        console.error("Error in getAllIntentions:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get a single intention by ID
exports.getIntentionById = async (req, res) => {
    try {
        const intention = await Intention.findById(req.params.id);
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
        const intention = await Intention.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!intention) {
            return res.status(404).json({ error: 'Intention not found' });
        }
        res.json(intention);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an intention
exports.deleteIntention = async (req, res) => {
    try {
        const intention = await Intention.findByIdAndDelete(req.params.id);
        if (!intention) {
            return res.status(404).json({ error: 'Intention not found' });
        }
        res.json({ message: 'Intention deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const Church = require('../models/church');
// Include other models if needed, e.g., User

exports.createChurch = async (req, res) => {
    try {
        const newChurch = new Church(req.body);
        await newChurch.save();
        res.status(201).json(newChurch);
    } catch (error) {
        res.status(400).json({ error: "Unable to create church" });
    }
};

exports.getAllChurches = async (req, res) => {
    const { userId } = req.body;
    try {
        const churches = await Church.find({ users: userId });
        res.json(churches);
    } catch (error) {
        res.status(400).json({ error: "Unable to retrieve churches" });
    }
};

exports.getChurchById = async (req, res) => {
    const { _id } = req.body;
    try {
        const church = await Church.findById(_id);
        if (!church) {
            return res.status(404).json({ error: "Church not found" });
        }
        res.json(church);
    } catch (error) {
        res.status(400).json({ error: "Error fetching church" });
    }
};

exports.updateChurch = async (req, res) => {
    const { _id } = req.body;
    try {
        const church = await Church.findByIdAndUpdate(_id, req.body, { new: true });
        res.json(church);
    } catch (error) {
        res.status(400).json({ error: "Unable to update church" });
    }
};

exports.deleteChurch = async (req, res) => {
    const { _id } = req.body;
    try {
        await Church.findByIdAndDelete(_id);
        res.json({ message: "Church deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Unable to delete church" });
    }
};


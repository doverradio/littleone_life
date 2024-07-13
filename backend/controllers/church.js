const Church = require('../models/church');
const User = require('../models/user'); // Assuming you have a User model

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

exports.getChurchesByZipCode = async (req, res) => {
    const { zipCode } = req.body;
    try {
        const churches = await Church.find({ zipCode });
        res.json(churches);
    } catch (error) {
        res.status(400).json({ error: "Unable to retrieve churches by zip code" });
    }
};

exports.addChurchesToUser = async (req, res) => {
    const { userId, churches } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const savedChurches = [];
        for (const churchData of churches) {
            let church = await Church.findOne({ name: churchData.name, address: churchData.address });
            if (!church) {
                church = new Church({ ...churchData, users: [userId] });
                await church.save();
            } else {
                if (!church.users.includes(userId)) {
                    church.users.push(userId);
                    await church.save();
                }
            }
            savedChurches.push(church);
        }

        user.churches.push(...savedChurches.map(ch => ch._id));
        await user.save();

        res.json({ churches: savedChurches });
    } catch (error) {
        res.status(400).json({ error: "Unable to add churches to user" });
    }
};

const Church = require('../models/church');
const User = require('../models/user'); // Assuming you have a User model
const { fetchNearbyChurches, mapGoogleDataToDesiredStructure, preprocessGoogleData } = require('../helpers/googleMaps')
const log = console.log;


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
    const { userId, latitude, longitude, radius } = req.body;
    try {
        const userChurches = await Church.find({ users: userId });

        const nearbyChurches = await fetchNearbyChurches(latitude, longitude, radius);

        // Preprocess the Google data
        const preprocessedNearbyChurches = preprocessGoogleData(nearbyChurches);

        // Map preprocessed data to desired structure
        const mappedNearbyChurches = mapGoogleDataToDesiredStructure(preprocessedNearbyChurches);

        // Filter out nearby churches that already exist in user churches
        const filteredNearbyChurches = mappedNearbyChurches.filter(nearbyChurch => {
            return !userChurches.some(userChurch => userChurch.name === nearbyChurch.name);
        });

        const combinedChurches = [...userChurches, ...filteredNearbyChurches];
        console.log("Combined Churches:", combinedChurches);

        res.json(combinedChurches);
    } catch (error) {
        console.error('Error retrieving churches:', error);
        res.status(400).json({ error: 'Unable to retrieve churches' });
    }
};

// exports.getAllChurches = async (req, res) => {
//     const { userId, latitude, longitude, radius } = req.body;
//     try {
//         const userChurches = await Church.find({ users: userId });
//         console.log("User Churches:", userChurches);

//         const nearbyChurches = await fetchNearbyChurches(latitude, longitude, radius);
//         console.log("Nearby Churches:", nearbyChurches);

//         // Filter out nearby churches that already exist in user churches
//         const filteredNearbyChurches = nearbyChurches.filter(nearbyChurch => {
//             return !userChurches.some(userChurch => userChurch.name === nearbyChurch.name);
//         });
//         console.log("Filtered Nearby Churches:", filteredNearbyChurches);

//         const combinedChurches = [...userChurches, ...filteredNearbyChurches];
//         console.log("Combined Churches:", combinedChurches);

//         res.json(combinedChurches);
//     } catch (error) {
//         res.status(400).json({ error: 'Unable to retrieve churches' });
//     }
// };



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

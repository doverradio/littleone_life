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
        // Fetch user churches
        const user = await User.findById(userId).populate('churches');
        const userChurches = user ? user.churches : [];

        // Fetch nearby churches
        const nearbyChurches = await fetchNearbyChurches(latitude, longitude, radius);

        // Preprocess and map Google data
        const preprocessedNearbyChurches = preprocessGoogleData(nearbyChurches);
        const mappedNearbyChurches = mapGoogleDataToDesiredStructure(preprocessedNearbyChurches);

        // Filter out nearby churches that already exist in user churches
        const filteredNearbyChurches = mappedNearbyChurches.filter(nearbyChurch => {
            return !userChurches.some(userChurch => userChurch.name === nearbyChurch.name);
        });

        const combinedChurches = [...userChurches, ...filteredNearbyChurches];
        // console.log("Combined Churches:", combinedChurches);

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

//         const nearbyChurches = await fetchNearbyChurches(latitude, longitude, radius);

//         // Preprocess the Google data
//         const preprocessedNearbyChurches = preprocessGoogleData(nearbyChurches);

//         // Map preprocessed data to desired structure
//         const mappedNearbyChurches = mapGoogleDataToDesiredStructure(preprocessedNearbyChurches);

//         // Filter out nearby churches that already exist in user churches
//         const filteredNearbyChurches = mappedNearbyChurches.filter(nearbyChurch => {
//             return !userChurches.some(userChurch => userChurch.name === nearbyChurch.name);
//         });

//         const combinedChurches = [...userChurches, ...filteredNearbyChurches];
//         // console.log("Combined Churches:", combinedChurches);

//         res.json(combinedChurches);
//     } catch (error) {
//         console.error('Error retrieving churches:', error);
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

    console.log("Request received:", { userId, churches });

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const savedChurches = [];
        for (const churchData of churches) {
            console.log("Processing church:", churchData);
            let church = await Church.findOne({ name: churchData.name, address: churchData.address });
            if (!church) {
                church = new Church(churchData);
                await church.save();
            }
            // Ensure the church is added to the user's churches array
            if (!user.churches.includes(church._id)) {
                user.churches.push(church._id);
            }
            savedChurches.push(church);
        }

        await user.save();

        res.json(savedChurches[0]); // Return the first added church as the response
    } catch (error) {
        console.error("Error adding churches to user:", error);
        res.status(400).json({ error: "Unable to add churches to user" });
    }
};



// exports.addChurchesToUser = async (req, res) => {
//     const { userId, churches } = req.body;
//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         const savedChurches = [];
//         for (const churchData of churches) {
//             let church = await Church.findOne({ name: churchData.name, address: churchData.address });
//             if (!church) {
//                 church = new Church({ ...churchData, users: [userId] });
//                 await church.save();
//             } else {
//                 if (!church.users.includes(userId)) {
//                     church.users.push(userId);
//                     await church.save();
//                 }
//             }
//             savedChurches.push(church);
//         }

//         user.churches.push(...savedChurches.map(ch => ch._id));
//         await user.save();

//         res.json({ churches: savedChurches });
//     } catch (error) {
//         res.status(400).json({ error: "Unable to add churches to user" });
//     }
// };

exports.addUserToChurch = async (req, res) => {
    const { userId, churchId } = req.body;

    try {
        const church = await Church.findById(churchId);
        if (!church) {
            return res.status(404).json({ error: 'Church not found' });
        }

        if (!church.users.includes(userId)) {
            church.users.push(userId);
            await church.save();
        }

        return res.json(church);
    } catch (error) {
        console.error('Error adding user to church:', error);
        res.status(400).json({ error: 'Unable to add user to church' });
    }
};

exports.removeChurchFromUser = async (req, res) => {
    const { userId, churchId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const church = await Church.findById(churchId);
        if (!church) {
            return res.status(404).json({ error: "Church not found" });
        }

        // Log the current state of user.churches and church.users
        console.log('User churches before removal:', user.churches);
        console.log('Church users before removal:', church.users);

        // Check if user.churches and church.users are defined and are arrays
        if (!Array.isArray(user.churches)) {
            user.churches = [];
        }
        if (!Array.isArray(church.users)) {
            church.users = [];
        }

        // Remove church from user's churches array
        user.churches = user.churches.filter(id => id.toString() !== churchId);
        await user.save();

        // Remove user from church's users array
        church.users = church.users.filter(id => id.toString() !== userId);
        await church.save();

        res.json({ message: "Church removed from user successfully" });
    } catch (error) {
        console.error("Error removing church from user:", error);
        res.status(400).json({ error: "Unable to remove church from user" });
    }
};

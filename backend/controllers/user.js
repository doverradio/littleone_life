const Rosary = require("../models/rosary"); 
const User = require('../models/user'); // Adjust the path according to your project structure
const log = console.log

exports.updatePrayerSettings = async (req, res) => {
    try {
        const { userId, prayerSettings } = req.body;

        // Find the user and update the prayerSettings field
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { prayerSettings: prayerSettings } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }


        // Optionally, you can send back only relevant information to the client
        const { username, firstName, lastName, email, role, prayerSettings: updatedPrayerSettings } = updatedUser;
        res.json({ user: { username, firstName, lastName, email, role, prayerSettings: updatedPrayerSettings } });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getPrayerSettings = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId) // .select('prayerSettings');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Optionally, you can send back only relevant information to the client
        const updatedPrayerSettings = user.prayerSettings;

        res.json(updatedPrayerSettings);
    } catch (error) {
        console.error('Error fetching prayer settings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUserSettings = async (req, res) => {
    // log(`Begin getUserSettings! req.body: `, req.body)
    try {
        const userId = req.body._id; // Assuming req.user contains the authenticated user's data
        const user = await User.findById(userId, '-hashed_password -salt'); // Exclude hashed_password and salt

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({
            error: 'Error retrieving user settings'
        });
    }
};

exports.updateUserSettings = async (req, res) => {
    try {
        const { _id, firstName, lastName, phoneNumber, username, email, prayerSettings, role, preferredLoginType, allowInstantPrayerArmy, allowNotifications, autoSendPrayerGroupRequest } = req.body;

        // Find the user by ID
        let user = await User.findById(_id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the fields
        if (firstName !== undefined) user.firstName = firstName;
        if (lastName !== undefined) user.lastName = lastName;
        if (phoneNumber !== undefined) user.phone = phoneNumber;
        if (username !== undefined) user.username = username;
        if (email !== undefined) user.email = email;
        if (prayerSettings !== undefined) user.prayerSettings = prayerSettings;
        if (role !== undefined) user.role = role;
        if (preferredLoginType !== undefined) user.preferredLoginType = preferredLoginType;
        if (allowInstantPrayerArmy !== undefined) user.allowInstantPrayerArmy = allowInstantPrayerArmy;
        if (allowNotifications !== undefined) user.allowNotifications = allowNotifications;
        if (autoSendPrayerGroupRequest !== undefined) user.autoSendPrayerGroupRequest = autoSendPrayerGroupRequest;

        // Save the updated user to trigger encryption
        user = await user.save();

        // Select the fields to return
        user = await User.findById(_id).select('-hashed_password -salt');

        res.json(user);
    } catch (error) {
        console.error('updateUserSettings - error: ', error);
        res.status(500).json({ error: 'Error updating user settings' });
    }
};

exports.getUserPrayerStats = async (req, res) => {
    const userId = req.params.userId;

    try {
        const rosaryCount = await Rosary.countDocuments({ user: userId });
        // Add similar queries for masses, confessions, and divineMercies if you have those models.

        const stats = {
            rosaries: rosaryCount,
            masses: 0, // Replace with actual count
            confessions: 0, // Replace with actual count
            divineMercies: 0 // Replace with actual count
        };

        res.json(stats);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
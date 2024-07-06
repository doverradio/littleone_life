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
        const { _id, firstName, lastName, phoneNumber, username, email, prayerSettings, role } = req.body;

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

        // Save the updated user to trigger encryption
        user = await user.save();

        // Select the fields to return
        user = user.toObject();
        delete user.hashed_password;
        delete user.salt;

        res.json(user);
    } catch (error) {
        console.error('updateUserSettings - error: ', error);
        res.status(500).json({ error: 'Error updating user settings' });
    }
};
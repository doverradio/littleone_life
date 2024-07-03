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
        const userId = req.user._id; // Use authenticated user ID
        const updates = req.body;

        const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-hashed_password -salt'); // Exclude hashed_password and salt

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({
            error: 'Error updating user settings'
        });
    }
};

  // /controllers/user.js

const MassAttendance = require("../models/massAttendance");
const Rosary = require("../models/rosary"); 
const Confession = require("../models/confession");
const Prayer = require('../models/prayer');
const AiInteraction = require('../models/ai'); // Adjust the path if necessary
const User = require('../models/user'); // Adjust the path according to your project structure
const log = console.log

exports.updatePrayerSettings = async (req, res) => {
    try {
        const { userId, prayerSettings } = req.body;
        
        console.log('Updating prayer settings for user:', userId); // Log the user ID
        console.log('New prayer settings:', prayerSettings); // Log the new prayer settings being received
        
        // Find the user and update the prayerSettings field
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { prayerSettings: prayerSettings } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('Updated prayer settings saved:', updatedUser.prayerSettings); // Log the updated prayer settings
        
        // Optionally, you can send back only relevant information to the client
        const { username, firstName, lastName, email, role, prayerSettings: updatedPrayerSettings } = updatedUser;
        res.json({ user: { username, firstName, lastName, email, role, prayerSettings: updatedPrayerSettings } });
    } catch (err) {
        console.error('Error updating prayer settings:', err); // Log any errors
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getPrayerSettings = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log('Fetching prayer settings for user:', userId);

        const user = await User.findById(userId, '-hashed_password -salt');
        // console.log('Fetched user:', user);
        let { prayerSettings } = user;
        // const user = await User.findById(userId).select('prayerSettings');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // let prayerSettings = user.prayerSettings;
        // console.log('Fetched prayer settings:', prayerSettings);

        // If prayerSettings is empty or undefined, fall back to default settings
        if (!prayerSettings || prayerSettings.length === 0) {
            console.log(`prayerSettings was empty, proceeding to create objects...`)
            prayerSettings = [
                { id: 'rosary', isVisible: true },
                { id: 'mass', isVisible: true },
                { id: 'confession', isVisible: true },
                { id: 'divineMercy', isVisible: true },
                { id: 'stMichaelPrayer', isVisible: true },
                { id: 'stfrancis', isVisible: true },
                { id: 'stleandroruiz', isVisible: true }
            ];
        }

        // console.log(`prayerSettings (final- getPrayerSettings): `, prayerSettings)
        res.json(prayerSettings);
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

        // console.log('updateUserSettings - Received data:', req.body); // Log the incoming data

        // Find the user by ID
        let user = await User.findById(_id);
        
        if (!user) {
            console.log('updateUserSettings - User not found with ID:', _id);
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the fields
        if (firstName !== undefined) user.firstName = firstName;
        if (lastName !== undefined) user.lastName = lastName;
        if (phoneNumber !== undefined) user.phone = phoneNumber;
        if (username !== undefined) user.username = username;
        if (email !== undefined) user.email = email;
        if (prayerSettings !== undefined) {
            // console.log('updateUserSettings - Updating prayerSettings:', prayerSettings); // Log prayer settings update
            user.prayerSettings = prayerSettings;
        }
        if (role !== undefined) user.role = role;
        if (preferredLoginType !== undefined) user.preferredLoginType = preferredLoginType;
        if (allowInstantPrayerArmy !== undefined) user.allowInstantPrayerArmy = allowInstantPrayerArmy;
        if (allowNotifications !== undefined) user.allowNotifications = allowNotifications;
        if (autoSendPrayerGroupRequest !== undefined) user.autoSendPrayerGroupRequest = autoSendPrayerGroupRequest;

        // Save the updated user to trigger encryption
        user = await user.save();

        // console.log('updateUserSettings - Saved user:', user); // Log the saved user data

        // Select the fields to return
        user = await User.findById(_id).select('-hashed_password -salt');

        res.json(user);
    } catch (error) {
        console.error('updateUserSettings - error:', error);
        res.status(500).json({ error: 'Error updating user settings' });
    }
};


exports.getUserPrayerStats = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const rosaryCount = await Rosary.countDocuments({ user: userId });
      const massCount = await MassAttendance.countDocuments({ user: userId });
      const confessionCount = await Confession.countDocuments({ user: userId });
      const divineMercyCount = await Prayer.countDocuments({user: userId});
      // Add similar queries for confessions and divineMercies if you have those models.
  
      const stats = {
        rosaries: rosaryCount,
        masses: massCount,
        confessions: confessionCount, // Replace with actual count
        divineMercies: divineMercyCount // Replace with actual count
      };
  
      res.json(stats);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


exports.updateAiModel = async (req, res) => {
    const { userId, aiModel } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.aiModel = aiModel;
        await user.save();

        res.status(200).json({ message: 'AI model updated successfully' });
    } catch (error) {
        console.error('Error updating AI model:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUserTokenUsage = async (req, res) => {
    try {
        const { userId } = req.params;
        const interactions = await AiInteraction.find({ userId });

        const totalTokens = interactions.reduce((acc, interaction) => acc + interaction.tokensUsed, 0);
        const totalCost = interactions.reduce((acc, interaction) => acc + interaction.cost, 0);

        res.status(200).json({ totalTokens, totalCost });
    } catch (error) {
        console.error('Error fetching token usage:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-hashed_password -salt');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


exports.getNotificationPreferences = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ preferences: user.notificationPreferences });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
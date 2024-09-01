const User = require('../models/user');

exports.toggleNotification = async (req, res) => {
    console.log(`Begin toggleNotification! req.body: `, req.body)
    const { userId, component } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const currentStatus = user.notificationPreferences[component] || false;
        // console.log(currentStatus: , currentStatus);
        user.notificationPreferences[component] = !currentStatus;

        // console.log(user.notificationPreferences: , user.notificationPreferences);
        await user.save();
        res.json({ message: `Notification for ${component} is now ${!currentStatus ? 'enabled' : 'disabled'}.` });
    } catch (error) {
        console.log(`toggleNotification error: `, error);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.disableNotification = async (req, res) => {
    const { userId, component } = req.query;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Log the current user notification preferences for debugging
        console.log('Current notification preferences:', user.notificationPreferences);

        // Disable the notification for the specific component
        user.notificationPreferences[component] = false;

        await user.save();

        console.log(`Notifications disabled for userId: ${userId}, component: ${component}`);
        res.json({ success: true });
    } catch (error) {
        console.error('Error disabling notification: ', error);
        res.status(500).json({ error: 'Internal server error' });
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
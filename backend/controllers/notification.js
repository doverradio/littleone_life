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
            return res.status(404).send('User not found');
        }

        user.notificationPreferences.set(component, false);

        await user.save();
        res.send('Notifications disabled successfully.');
    } catch (error) {
        res.status(500).send('Server error');
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
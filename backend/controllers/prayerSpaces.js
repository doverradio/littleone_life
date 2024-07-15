const PrayerSpace = require('../models/prayerSpace');

exports.createPrayerSpace = async (req, res) => {
    try {
        const space = new PrayerSpace(req.body);
        await space.save();
        res.status(201).json(space);
    } catch (error) {
        res.status(400).json({ error: 'Unable to create prayer space' });
    }
};

exports.joinPrayerSpace = async (req, res) => {
    const { spaceId, userId } = req.body;
    try {
        const space = await PrayerSpace.findById(spaceId);
        if (!space) {
            return res.status(404).json({ error: 'Prayer space not found' });
        }
        space.users.push(userId);
        await space.save();
        res.json(space);
    } catch (error) {
        res.status(400).json({ error: 'Unable to join prayer space' });
    }
};

exports.getPrayerSpace = async (req, res) => {
    try {
        const space = await PrayerSpace.findById(req.params.id).populate('users');
        if (!space) {
            return res.status(404).json({ error: 'Prayer space not found' });
        }
        res.json(space);
    } catch (error) {
        res.status(400).json({ error: 'Unable to fetch prayer space' });
    }
};

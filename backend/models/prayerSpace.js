const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const prayerSpaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    users: [{
        type: ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('PrayerSpace', prayerSpaceSchema);

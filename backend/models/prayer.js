const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const prayerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    },
    type: {
        type: String,
        required: true
    },
    intentions: [{
        type: ObjectId,
        ref: 'Intention'
    }],
    // Add other common fields if necessary
}, {
    timestamps: true // To capture when the prayer was created/updated
});

const Prayer = mongoose.model('Prayer', prayerSchema);

module.exports = Prayer;

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const rosarySchema = new mongoose.Schema(
    {
        m: {
            type: String,
            required: true,
            enum: ['Joyful', 'Glorious', 'Sorrowful', 'Luminous']
        },
        i: [{
            type: ObjectId,
            ref: 'Intention'
        }],
        user: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        // r: {
        //     type: String,
        //     // Here you can store a reference to the recording's location
        // }
        // Additional fields can be added as needed
    },
    { timestamps: true }
);

module.exports = mongoose.model("Rosary", rosarySchema);

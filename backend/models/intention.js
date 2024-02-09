const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const intentionSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            enum: ['Mass', 'Rosary', 'Other'],
            default: 'Other'
        },
        isPublic: {
            type: Boolean,
            default: false
        }
        // Additional fields can be added as needed
    },
    { timestamps: true }
);

module.exports = mongoose.model("Intention", intentionSchema);

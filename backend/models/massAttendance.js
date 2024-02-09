const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const massAttendanceSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        church: {
            type: ObjectId,
            ref: 'Church',
            required: true
        },
        massTime: {
            type: Date,
            required: true
        },
        intentions: {
            type: String,
            trim: true
        },
        specialIntentions: {
            type: String,
            trim: true
        },
        // Optional: If you plan to implement photo verification later
        // photos: [{
        //     type: String,
        //     trim: true
        // }],
        additionalInfo: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("MassAttendance", massAttendanceSchema);

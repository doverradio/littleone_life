const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const confessionSchema = new mongoose.Schema(
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
        confessionTime: {
            type: String,
            required: true
        },
        // Additional fields can be added if needed
    },
    { timestamps: true }
);

module.exports = mongoose.model("Confession", confessionSchema);

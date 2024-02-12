const mongoose = require("mongoose");

const churchSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        address: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true,
        },
        zipCode: {
            type: String,
            trim: true
        },
        massTimes: [{
            type: String,
            trim: true
        }],
        contactNumber: {
            type: String,
            trim: true
        },
        website: {
            type: String,
            trim: true
        },
        additionalInfo: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Church", churchSchema);

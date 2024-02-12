const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

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
        phone: {
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
        },
        users: [{
            type: ObjectId,
            ref: 'User',
            required: true
          }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Church", churchSchema);

const mongoose = require("mongoose");
const crypto = require('crypto');
const fieldEncryption = require('mongoose-field-encryption').fieldEncryption;
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
        i: [{
            type: ObjectId,
            ref: 'Intention'
        }],
        specialIntentions: {
            type: String,
            trim: true
        },
        // Optional: If you plan to implement photo verification later
        // photos: [{
        //     type: String,
        //     trim: true
        // }],
    },
    { timestamps: true }
);

// Encryption key and signature key (should be stored in environment variables, not in code directly)
var encKey = process.env.SOME_32BYTE_BASE64_STRING;
var sigKey = process.env.SOME_64BYTE_BASE64_STRING;

// Apply field encryption to the content field
intentionSchema.plugin(fieldEncryption, {
  fields: ['specialIntentions'],
  secret: encKey, // use the encryption key
  saltGenerator: function (secret) {
    // Ensure the salt is a string of length 16
    const salt = crypto.randomBytes(8).toString('hex'); // Generate a hex string of 16 characters (8 bytes)
    return salt;
  }
});

module.exports = mongoose.model("MassAttendance", massAttendanceSchema);

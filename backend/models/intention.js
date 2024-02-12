const mongoose = require('mongoose');
const crypto = require('crypto');
const fieldEncryption = require('mongoose-field-encryption').fieldEncryption;
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
      enum: ['Mass', 'Rosary', 'Divine Mercy', 'Other'],
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

// Encryption key and signature key (should be stored in environment variables, not in code directly)
var encKey = process.env.SOME_32BYTE_BASE64_STRING;
var sigKey = process.env.SOME_64BYTE_BASE64_STRING;

// Apply field encryption to the content field
intentionSchema.plugin(fieldEncryption, {
  fields: ['content'],
  secret: encKey, // use the encryption key
  saltGenerator: function (secret) {
    // Ensure the salt is a string of length 16
    const salt = crypto.randomBytes(8).toString('hex'); // Generate a hex string of 16 characters (8 bytes)
    return salt;
  }
});


// If you want to include additional authenticated fields (fields that are part of the encryption process but not encrypted)
// intentionSchema.plugin(fieldEncryption, {
//   fields: ['content'],
//   secret: encKey,
//   saltGenerator: function (secret) {
//     return crypto.randomBytes(16).toString('hex');
//   },
//   additionalAuthenticatedFields: ['type'] // Additional fields here
// });

module.exports = mongoose.model('Intention', intentionSchema);

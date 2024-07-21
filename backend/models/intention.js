const mongoose = require('mongoose');
const crypto = require('crypto');
const { ObjectId } = mongoose.Schema;
const fieldEncryption = require('mongoose-field-encryption').fieldEncryption;

// Load encryption keys from environment variables
const encKey = process.env.SOME_32BYTE_BASE64_STRING;
const sigKey = process.env.SOME_64BYTE_BASE64_STRING;

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
  },
  { timestamps: true }
);

intentionSchema.plugin(fieldEncryption, {
  fields: ['content'],
  secret: encKey,
  saltGenerator: function(secret) {
    const salt = crypto.randomBytes(8).toString('hex');
    return salt;
  }
});

module.exports = mongoose.model('Intention', intentionSchema);

const mongoose = require('mongoose');
const crypto = require('crypto');
const fieldEncryption = require('mongoose-field-encryption').fieldEncryption;

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [
        {
            role: { type: String, enum: ['user', 'ai'], required: true },
            content: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

// Encryption keys
var encKey = process.env.SOME_32BYTE_BASE64_STRING;
var sigKey = process.env.SOME_64BYTE_BASE64_STRING;

chatSchema.plugin(fieldEncryption, {
    fields: ['messages.content'],  // Encrypt the content of the messages
    secret: encKey,
    saltGenerator: function (secret) {
        return crypto.randomBytes(16).toString('hex');
    }
});

module.exports = mongoose.model('ChatHistory', chatSchema);

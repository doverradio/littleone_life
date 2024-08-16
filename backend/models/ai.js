const mongoose = require('mongoose');
const crypto = require('crypto');
const fieldEncryption = require('mongoose-field-encryption').fieldEncryption;

const aiInteractionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    interactionType: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    model: {
        type: String,
        default: 'gpt-3.5-turbo'
    },
    tokensUsed: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const encKey = process.env.SOME_32BYTE_BASE64_STRING;
const sigKey = process.env.SOME_64BYTE_BASE64_STRING;

aiInteractionSchema.plugin(fieldEncryption, {
    fields: ['content', 'response'],
    secret: encKey,
    saltGenerator: function(secret) {
        // Generate a 16-character string for the salt
        return crypto.randomBytes(8).toString('hex');
    }
});

module.exports = mongoose.model('AiInteraction', aiInteractionSchema);

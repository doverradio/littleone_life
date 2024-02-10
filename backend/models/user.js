const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');
const fieldEncryption = require('mongoose-field-encryption').fieldEncryption;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxlength: 25
    },
    firstName: {
        type: String,
        trim: true,
        maxlength: 100
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    hashed_password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Encryption key and signature key
var encKey = process.env.SOME_32BYTE_BASE64_STRING;
var sigKey = process.env.SOME_64BYTE_BASE64_STRING;

// Virtual field for password
userSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

// Methods
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        } catch (err) {
            return '';
        }
    }
};

// Field encryption
userSchema.plugin(fieldEncryption, {
    fields: ['firstName', 'lastName', 'email', 'about', 'phone'],
    secret: encKey,
    saltGenerator: function(secret) {
        // Ensure the salt is a string of length 16
        const salt = crypto.randomBytes(8).toString('hex'); // Generate a hex string of 16 characters (8 bytes)
        return salt;
    }
});


module.exports = mongoose.model('User', userSchema);

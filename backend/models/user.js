const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');
const fieldEncryption = require('mongoose-field-encryption').fieldEncryption;

const userSchema = new mongoose.Schema({
    username: { type: String, trim: true, required: true, unique: true, maxlength: 25 },
    firstName: { type: String, trim: true, maxlength: 100 },
    lastName: { type: String, trim: true, maxlength: 100 },
    email: { type: String, trim: true, required: true, unique: true },
    phone: { type: String, trim: true },
    hashed_password: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    about: { type: String, trim: true },
    prayerSettings: {
        type: Array,
        default: [
            { id: 'rosary', isVisible: true },
            { id: 'mass', isVisible: true },
            { id: 'confession', isVisible: true },
            { id: 'divineMercy', isVisible: true },
            { id: 'stMichaelPrayer', isVisible: false },
            { id: 'stfrancis', isVisible: false },
            { id: 'stleandroruiz', isVisible: false }
        ]
    },
    preferences: {   // New field for user preferences
        type: Object,
        default: {}
    },
    salt: String,
    role: { type: Number, default: 0 },
    preferredLoginType: { type: String, default: 'username-password' },
    allowInstantPrayerArmy: { type: Boolean, default: false },
    allowNotifications: { type: Boolean, default: false },
    autoSendPrayerGroupRequest: { type: Boolean, default: false },
    isSeller: { type: Boolean, default: false },
    stripeCustomerId: { type: String },
    sellerInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', default: null },
    buyerInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', default: null },
    churches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Church' }],
    aiModel: { type: String, default: 'gpt-3.5-turbo' },
    notificationPreferences: { type: Object, default: {} },
}, { timestamps: true });

const encKey = process.env.SOME_32BYTE_BASE64_STRING;
const sigKey = process.env.SOME_64BYTE_BASE64_STRING;

userSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

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

userSchema.plugin(fieldEncryption, {
    fields: ['firstName', 'lastName', 'email', 'about', 'phone', 'prayerSettings', 
        'preferences'

    ],
    secret: encKey,
    saltGenerator: function(secret) {
        const salt = crypto.randomBytes(8).toString('hex');
        return salt;
    }
});

module.exports = mongoose.model('User', userSchema);

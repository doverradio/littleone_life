const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require('uuid');
const { ObjectId } = mongoose.Schema;
var encrypt = require('mongoose-encryption');
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;
// var encKey = process.env.SOME_32BYTE_BASE64_STRING;
var encKey = process.env.SOME_32BYTE_BASE64_STRING;
var sigKey = process.env.SOME_64BYTE_BASE64_STRING;


const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            // required: true,
            maxlength: 100
        },
        lastName: {
            type: String,
            trim: true,
            // required: true,
            maxlength: 100
        },
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 200
        },
        facebook_access_token: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
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
        },
        history: {
            type: Array,
            default: []
        },
        availableInventorySpace: {
            type: Array,
            default: []
        },
        chatgptkey_id: {
            type: String,
            default: ""
        },
        access_token: {
            type: String,
            default: ""
        },
        pinterest_access_token: {
            type: String,
            default: ""
        },
        amazon_access_token: {
            type: String,
            default: ""
        },
        refresh_token: {
            type: String,
            default: ""
        },
        pinterest_refresh_token: {
            type: String,
            default: ""
        },
        amazon_refresh_token: {
            type: String,
            default: ""
        },
        token: {
            type: Array,
            default: []
        },
        pinterestToken: {
            type: Array,
            default: []
        },
        amazon_token: {
            type: Array,
            default: []
        },
        clientId: {
            type: String,
            default: ""
        },
        clientSecret: {
            type: String,
            default: ""
        },
        devId: {
            type: String,
            default: ""
        },
        ruName: {
            type: String,
            default: ""
        },
        ebayUsername: {
            type: String,
            default: ""
        },
        ebayPassword: {
            type: String,
            default: ""
        },
        address1: {
            type: String,
            default: ""
        },
        address2: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        state: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            default: "Active",
            enum: [
                "Active",
                "Not Active"
            ]
        },
        eligibility: {
            type: String,
            default: "Eligible",
            enum: [
                "Eligible",
                "Not Eligible"
            ]
        },
        zip: {
            type: String,
            default: ""
        },
        country: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        ShippingProfileID: {
            type: String,
            default: ""
        },
        ShippingProfileName: {
            type: String,
            default: ""
        },
        ReturnProfileID: {
            type: String,
            default: ""
        },
        ReturnProfileName: {
            type: String,
            default: ""
        },
        PaymentProfileID: {
            type: String,
            default: ""
        },
        PaymentProfileName: {
            type: String,
            default: ""
        },
        token_last_refresh: {
            type: Date,
            default: ""
        },
        pinterest_token_last_refresh: {
            type: Date,
            default: ""
        },
        ebaySold: {
            type: Array,
            default: []
        },
        ebayListing: {
            type: Array,
            default: []
        },
        windowsremotedesktop: [{
            type: ObjectId,
            ref: "WindowsRemoteDesktops"
        }],
        BonanzaListing: [{
            type: ObjectId,
            ref: "Bonanzalisting"
        }],
        GoogleShoppingListing: [{
            type: ObjectId,
            ref: "GoogleShoppingListing"
        }],
        AmazonListing: [{
            type: ObjectId,
            ref: "AmazonListing"
        }],
        language: {
            type: mongoose.Schema.Types.Mixed,
            default: {'en': 'English'}
        },
        resetPasswordLink: {
            data: String,
            default: ''
        },
        bonanza_devId: {
            type: String,
            default: ""
        },
        bonanza_certId: {
            type: String,
            default: ""
        },
        planType: {
            type: String,
            default: "Classic",
            enum: [
                "Classic",
                "Luxury"
            ]
        },
        bonanza_userToken: {
            type: Array,
            default: []
        },
        rank: {
            type: Number,
            default: 0,
            enum: [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        accept_terms: {
            type: Boolean
        },
        pro_accept_terms: {
            type: Boolean
        },
        pro_referral_code: {
            type: String,
            unique: true
        },
        referral_code: {
            type: String,
            unique: true
        },
        sign_up_referral_code: {
            type: String,
            unique: true
        },
        sign_up_pro_referral_code: {
            type: String,
            unique: true
        },
        pendingPinterestOAuth: {
            type: Boolean,
            default: false
        },
        pendingPinterestOAuthUrl: {
            type: String,
            default: ""
        },
        pendingPinterestOAuthUrlTime: {
            type: Date
        },
        pendingPinterestOAuthUrlExpiresTime: {
            type: Date
        },
        pendingEbayOAuth: {
            type: Boolean,
            default: false
        },
        pendingEbayOAuthUrl: {
            type: String,
            default: ""
        },
        pendingEbayOAuthUrlTime: {
            type: Date
        },
        pendingEbayOAuthUrlExpiresTime: {
            type: Date
        },
        sellerRegistrationCompletedEbay: {
            type: Boolean,
            default: false
        },
        challengeResponse: {
            type: String,
            default: ""
        },
        ebayPromotionItemLimit: {
            type: Number,
            default: null
        },
        promotional_limit_used: {
            type: Number,
            default: null
        },
        item_quantity_limit: {
            type: Number,
            default: null
        },
        dollar_limit: {
            type: Number,
            default: null
        },
        ebayitem_hardlimit: {
            type: Number,
            default: 0
        },
        ideal_item_price: {
            type: Number,
            default: null
        },
        last_promotional_status: {
            type: Date,
            default: null
        },
        automaticallyChargeCardOnSales: {
            type: Boolean,
            default: false
        },
        braintreeVault_id: {
            type: String,
            default: ""
        },
        braintreeCustomerId: {
            type: String,
            default: ""
        },
        zellememberemail: {
            type: String,
            default: ""
        },
        zellememberphone: {
            type: String,
            default: ""
        },
        stripe_account_id: {
            type: String,
            default: ""
        },
        stripe_customer_id: {
            type: String,
            default: ""
        },
        stripe_seller: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },
        stripeSession: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

    },
    { timestamps: true }
);

// virtual field
userSchema
    .virtual("password")
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
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};


// // encrypt entire doc
userSchema.plugin(encrypt, { 
    encryptionKey: encKey, 
    signingKey: sigKey, 
    excludeFromEncryption: [ 
        'hashed_password', 
        'salt',
        'email'
    ], 
    // additionalAuthenticatedFields: ['email'] 
});


module.exports = mongoose.model("User", userSchema);

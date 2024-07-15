const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    subscriptionStatus: {
        type: String,
        enum: ['free', 'basic', 'premium'],
        default: 'free'
    },
    subscriptionEndDate: {
        type: Date
    },
    totalSales: {
        type: Number,
        default: 0
    },
    commissionRate: {
        type: Number,
        default: 0.13 // 13%
    },
    stripeCustomerId: {
        type: String,
        unique: true,
        sparse: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'USD'
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'paypal', 'stripe', 'other'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    transactionId: {
        type: String,
        unique: true,
        required: true
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    paymentGateway: {
        type: String,
        enum: ['stripe', 'paypal', 'manual', 'other'],
        required: true
    },
    paymentDetails: {
        type: Object, // This can store additional details from the payment gateway, like response data
        default: {}
    },
    refundDetails: {
        type: Object, // Store refund-related details if the payment is refunded
        default: {}
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);

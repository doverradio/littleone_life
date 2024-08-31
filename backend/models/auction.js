const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    startingPrice: { type: Number, required: true },
    currentBid: { type: Number, default: null },
    highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    bidHistory: [{
        bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        bidAmount: { type: Number },
        bidTime: { type: Date, default: Date.now }
    }],
    endTime: { type: Date, required: true },
    status: { type: String, enum: ['active', 'ended'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Auction', auctionSchema);

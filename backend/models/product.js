const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    buyItNowPrice: { type: Number, default: null },
    auctionStartPrice: { type: Number, default: null },
    auctionEndTime: { type: Date, default: null },
    currentBid: { type: Number, default: null },
    highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: String }],
    categories: [{ type: String }],
    tags: [{ type: String }],
    isAuction: { type: Boolean, default: false },
    isBuyItNow: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'sold', 'expired'], default: 'active' },
    seoFriendlyUrl: { type: String, unique: true, required: true }, // SEO-friendly URL
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  subject: { type: String, required: true },
  text: { type: String },
  html: { type: String },
  sentAt: { type: Date, default: Date.now }
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;

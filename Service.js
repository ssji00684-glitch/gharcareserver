const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema({
  name: String,
  description: String,
  basePrice: Number,
  duration: String,
  icon: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Service', serviceSchema);

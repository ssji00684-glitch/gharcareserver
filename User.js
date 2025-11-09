const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String, unique: true, required: true },
  passwordHash: String,
  address: String,
  city: String,
  role: { type: String, enum: ['customer','partner','admin'], default: 'customer' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', userSchema);

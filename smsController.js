require('dotenv').config();
const axios = require('axios');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// -------------------------------
// 1️⃣ SEND OTP
// -------------------------------
exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone number required' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store OTP temporarily (you can use MongoDB or Redis in production)
    global.otpStore = global.otpStore || {};
    global.otpStore[phone] = otp;

    const message = `Your GharCare OTP is ${otp}. It is valid for 5 minutes.`;

    const response = await axios.post(
      'https://www.fast2sms.com/dev/bulkV2',
      {
        route: 'q',
        message,
        language: 'english',
        flash: 0,
        numbers: phone,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
        },
      }
    );

    console.log("Fast2SMS Response:", response.data);

    return res.json({ success: true, message: 'OTP sent successfully' });

  } catch (err) {
    console.error("Fast2SMS Error:", err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// -------------------------------
// 2️⃣ VERIFY OTP
// -------------------------------
exports.verifyOtp = async (req, res) => {
  try {
    const { phone, code } = req.body;

    if (!global.otpStore || !global.otpStore[phone]) {
      return res.status(400).json({ success: false, message: 'OTP not found or expired' });
    }

    if (parseInt(code) !== parseInt(global.otpStore[phone])) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    delete global.otpStore[phone]; // OTP used once

    // Create/find user
    let user = await User.findOne({ phone });
    if (!user) user = await User.create({ phone, name: 'New User', role: 'customer' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '30d' }
    );

    return res.json({ success: true, message: 'OTP verified', user, token });
  } catch (err) {
    console.error("Verify OTP Error:", err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

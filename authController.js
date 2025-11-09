const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, phone, password, role } = req.body;
    let user = await User.findOne({ phone });
    if (user) return res.status(200).json({ success: true, user, message: 'User exists' });
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password || phone.slice(-4), salt);
    user = await User.create({ name, phone, passwordHash, role });
    res.status(201).json({ success: true, user });
  } catch (err) { res.status(500).json({ success:false, message: err.message }); }
};

exports.login = async (req,res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ success:false, message: 'User not found' });
    const isMatch = await bcrypt.compare(password || phone.slice(-4), user.passwordHash);
    if (!isMatch) return res.status(401).json({ success:false, message:'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ success:true, token, user });
  } catch(err){ res.status(500).json({ success:false, message: err.message }); }
};

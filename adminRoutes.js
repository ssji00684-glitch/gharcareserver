const express = require('express'); const router = express.Router();
const Booking = require('../models/Booking');
router.get('/summary', async (req,res)=>{ const total = await Booking.countDocuments(); const recent = await Booking.find().sort({createdAt:-1}).limit(10); res.json({success:true,total, recent}); });
module.exports = router;

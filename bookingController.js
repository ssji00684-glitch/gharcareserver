const Booking = require('../models/Booking');
const User = require('../models/User');

exports.create = async (req,res)=>{
  try{
    const b = await Booking.create(req.body);
    // TODO: notify partner via FCM or WhatsApp
    res.status(201).json({success:true,booking:b});
  }catch(err){ res.status(500).json({success:false,message:err.message}); }
};

exports.byCustomer = async (req,res)=>{
  try{
    const list = await Booking.find({ customerId: req.params.customerId }).populate('serviceId partnerId');
    res.json({success:true,bookings:list});
  }catch(err){ res.status(500).json({success:false,message:err.message}); }
};

exports.all = async (req,res)=>{
  try{ const list = await Booking.find().populate('serviceId customerId partnerId').limit(1000); res.json({success:true,bookings:list}); }
  catch(err){ res.status(500).json({success:false,message:err.message}); }
};

exports.updateStatus = async (req,res)=>{
  try{
    const b = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new:true });
    res.json({success:true,booking:b});
  }catch(err){ res.status(500).json({success:false,message:err.message}); }
};

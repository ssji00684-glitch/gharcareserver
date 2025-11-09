
const Razorpay = require('razorpay');
const Booking = require('../models/Booking');
const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID || '', key_secret: process.env.RAZORPAY_KEY_SECRET || '' });

exports.createOrder = async (req,res)=>{
  try{
    const { amount, bookingId } = req.body;
    const amtPaise = Math.round(amount*100);
    const options = { amount: amtPaise, currency: 'INR', receipt: 'rcpt_'+Date.now() };
    const order = await instance.orders.create(options);
    if (bookingId) await Booking.findByIdAndUpdate(bookingId, { razorpayOrderId: order.id });
    res.json({ success:true, order });
  }catch(err){ res.status(500).json({ success:false, message: err.message }); }
};

const crypto = require('crypto');
exports.verifyPayment = async (req,res)=>{
  try{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '').update(razorpay_order_id + '|' + razorpay_payment_id).digest('hex');
    if (generated_signature === razorpay_signature) {
      // mark booking as paid
      if (bookingId) await Booking.findByIdAndUpdate(bookingId, { status: 'paid', razorpayPaymentId: razorpay_payment_id });
      return res.json({ success:true, message:'Payment verified' });
    } else {
      return res.status(400).json({ success:false, message:'Invalid signature' });
    }
  }catch(err){ res.status(500).json({ success:false, message:err.message }); }
};

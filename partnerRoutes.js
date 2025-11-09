const express = require('express'); const router = express.Router();
const User = require('../models/User');
// partners are users with role 'partner'
router.post('/register', async (req,res)=>{ try{ const {name,phone,password,serviceType} = req.body; const u = await User.create({name,phone,role:'partner'}); res.json({success:true,user:u}); }catch(err){res.status(500).json({success:false,message:err.message});} });
router.get('/', async (req,res)=>{ const p = await User.find({ role:'partner' }).limit(500); res.json({success:true,partners:p}); });
module.exports = router;

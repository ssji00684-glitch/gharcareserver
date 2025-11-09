const Service = require('../models/Service');
exports.addService = async (req,res)=>{ try{ const s = await Service.create(req.body); res.status(201).json({success:true,service:s}); }catch(err){res.status(500).json({success:false,message:err.message});}};
exports.list = async (req,res)=>{ try{ const services = await Service.find(); res.json({success:true,services}); }catch(err){res.status(500).json({success:false,message:err.message});}};

const express = require('express'); const router = express.Router();
const User = require('../models/User');
router.get('/:id', async (req,res)=>{ const u = await User.findById(req.params.id); res.json({success:true,user:u}); });
module.exports = router;

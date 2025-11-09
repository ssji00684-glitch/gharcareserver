const jwt = require('jsonwebtoken');
exports.auth = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ success:false, message:'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success:false, message:'Invalid token' });
  }
};
exports.adminOnly = (req,res,next) => {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ success:false, message:'Admin only' });
};

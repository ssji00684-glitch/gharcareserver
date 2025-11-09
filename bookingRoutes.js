const { auth } = require('../utils/authMiddleware');
const express = require('express'); const router = express.Router();
const { create, byCustomer, all, updateStatus } = require('../controllers/bookingController');
router.post('/', auth, create);
router.get('/customer/:customerId', auth, byCustomer);
router.get('/', all);
router.patch('/:id/status', updateStatus);
module.exports = router;

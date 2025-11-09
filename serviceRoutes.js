const express = require('express'); const router = express.Router();
const { addService, list } = require('../controllers/serviceController');
router.post('/', addService);
router.get('/', list);
module.exports = router;

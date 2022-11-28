const express = require('express');
const router = express.Router();
var account_controller = require('../controllers/accountController');

router.get('/', account_controller.index);

module.exports = router;
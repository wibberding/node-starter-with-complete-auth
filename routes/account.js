const express = require('express');
const router = express.Router();
import userAuth from '../middleware/auth-check';
var account_controller = require('../controllers/accountController');

router.get('/', userAuth, account_controller.index);

module.exports = router;
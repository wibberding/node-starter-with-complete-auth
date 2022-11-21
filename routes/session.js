const express = require('express');
const router = express.Router();
var session_controller = require('../controllers/sessionController');

router.get('/register', session_controller.register);
router.get('/login', session_controller.login);
router.get('/logout', session_controller.logout);

router.get('/password-reset', session_controller.password_reset);
router.get('/account-verified', session_controller.account_verified);

module.exports = router;
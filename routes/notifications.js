const express = require('express');
const router = express.Router();
var notifications_controller = require('../controllers/notificationsController');

router.get('/error', notifications_controller.error);
router.get('/password-reset', notifications_controller.password_reset);
router.get('/account-verified', notifications_controller.account_verified);

module.exports = router;
const express = require('express');
const router = express.Router();
var notifications_controller = require('../controllers/notificationsController');

router.get('/error', notifications_controller.error);

module.exports = router;
const express = require('express');
const router = express.Router();
var home_controller = require('../controllers/homeController');

router.get('/', home_controller.index);
router.get('/about', home_controller.about);

module.exports = router;

const express = require('express');
const deviceController = require('../controllers/deviceController');
const { authenticateUser, authorizeAdmin } = require('../config/auth');

const router = express.Router();

router.post('/', authenticateUser, authorizeAdmin, deviceController.addDevice);
router.delete('/:deviceId', authenticateUser, authorizeAdmin, deviceController.removeDevice);

module.exports = router;

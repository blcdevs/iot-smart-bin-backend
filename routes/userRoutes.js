const express = require('express');
const userController = require('../controllers/userController');
const { authenticateUser, authorizeAdmin } = require('../config/auth');

const router = express.Router();

router.post('/', authenticateUser, authorizeAdmin, userController.addUser);
router.delete('/:userId', authenticateUser, authorizeAdmin, userController.removeUser);

module.exports = router;

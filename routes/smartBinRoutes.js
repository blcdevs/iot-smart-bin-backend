const express = require('express');
const smartBinController = require('../controllers/smartBinController');
const { authenticateUser, authorizeAdmin } = require('../config/auth');

const router = express.Router();

router.post('/', authenticateUser, authorizeAdmin, smartBinController.createSmartBin);
router.put('/:id', smartBinController.updateSmartBin);
router.delete('/:id', authenticateUser, authorizeAdmin, smartBinController.deleteSmartBin);
router.get('/:id', smartBinController.getSmartBin);
// router.get('/', authenticateUser, smartBinController.getAllSmartBins);
router.get('/', smartBinController.getAllSmartBins);

router.get('/bin/:binId', smartBinController.getSmartBinByBinId);



module.exports = router;
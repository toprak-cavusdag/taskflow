const express = require('express');
const reportController = require('../controllers/reportController');

const router = express.Router();

router.get('/completed', reportController.completed);
router.get('/pending', reportController.pending);
router.get('/summary', reportController.summary);

module.exports = router;

const express = require('express');
const { logVisit } = require('../controllers/visitorController');

const router = express.Router();

router.post('api/log-visit', logVisit);

module.exports = router;
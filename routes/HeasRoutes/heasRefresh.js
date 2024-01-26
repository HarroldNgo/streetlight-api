const express = require('express');
const router = express.Router();
const refreshTokenController = require('../../controllers/HeasControllers/heasRefreshTokenController');

router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;
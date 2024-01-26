const router = require("express").Router();
const authController = require('../../controllers/HeasControllers/heasAuthController');

router.post('/', authController.handleLogin);

module.exports = router;
const express = require("express");
const router = express.Router();
const controller = require("../controllers/fileController");

router.delete("/:name", controller.remove);


module.exports = router;
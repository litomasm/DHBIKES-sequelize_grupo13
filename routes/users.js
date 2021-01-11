const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersController")

router.get('/crear',usersController.crear);
router.post('/crear',usersController.guardado);

module.exports = router;

const express = require('express');
const router = express.Router();
const productosController = require("../controllers/productosController")

router.get('/crear',productosController.crear);
router.post('/crear',productosController.guardado);

module.exports = router;

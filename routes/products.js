const express = require('express');
const router = express.Router();
const productosController = require("../controllers/productosController")

//Crear producto
router.get('/crear',productosController.crear);
router.post('/crear',productosController.guardado);

//Todos los productos
router.get("/", productosController.list);

//Detalle
router.get("/detail/:id", productosController.detail);

//Actualización
router.get("/editar/:id", productosController.editar);
router.post("/editar/:id", productosController.actualizar);

//Borrado

router.post("/borrar/:id", productosController.borrar);

module.exports = router;

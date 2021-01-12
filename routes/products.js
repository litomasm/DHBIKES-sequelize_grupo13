const express = require('express');
const router = express.Router();
const productosController = require("../controllers/productosController")
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join("public/images/products"))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })



//Crear producto
router.get('/crear',productosController.crear);
router.post('/crear',upload.any(), productosController.guardado);

//Todos los productos
router.get("/", productosController.list);

//Filtrar productos
router.get("/filter", productosController.filter)

//Ruta hacia la búsqueda del producto
router.get('/search', productosController.search)

//Detalle
router.get("/detail/:id", productosController.detail);

//Actualización
router.get("/editar/:id", productosController.editar);
router.post("/editar/:id", upload.any(), productosController.actualizar);

//Borrado

router.post("/borrar/:id", productosController.borrar);

module.exports = router;

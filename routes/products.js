const express = require('express');
const router = express.Router();
const productosController = require("../controllers/productosController")
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join("public/imgs/products"))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage,

fileFilter: (req, file, cb) => {
		
		const acceptedExt = ['.jpg','.webp','.jpeg','.png']
		const ext = path.extname(file.originalname)
		
		if(!acceptedExt.includes(ext)){
      
      req.files = [...req.files ,file]
      
		}
		cb(null,acceptedExt.includes(ext));
    }
})

//Crear producto
router.get('/crear',productosController.crear);
router.post('/crear',upload.any(), productosController.guardado);

//Todos los productos
router.get("/", productosController.list);

//Detalle
router.get("/detail/:id", productosController.detail);

//Actualización
router.get("/editar/:id", productosController.editar);
router.post("/editar/:id", upload.any(), productosController.actualizar);

//Borrado

router.post("/borrar/:id", productosController.borrar);

module.exports = router;

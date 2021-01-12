const express = require('express');
const multer = require('multer');
const path = require('path')
const router = express.Router();
const usersController = require("../controllers/usersController");
const fs = require('fs');
const {check, body} = require('express-validator');

const authMiddleware = require("../middleware/authMiddleware")
const uploadUserMiddleware = require('../middleware/uploadUserMiddleware')
const guestMiddleware = require('../middleware/guestMiddleware')

/* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/../../public/images/users')
      
    },
    filename: function (req, file, cb) {
      console.log(file)
      cb(null, file.fieldname + '-' + Date.now() + '-' +file.originalname)
    }
  })
   
const upload = multer({ storage: storage })

const usersFilePath = path.join(__dirname + "/../data/usuarios.json") */

router.get('/register',usersController.crear);
router.post('/register',usersController.guardado);

module.exports = router;

const express = require("express");
const router = express.Router();
const { check } = require('express-validator')
const enlacesController = require('../controllers/enlacesController');
const archivoController = require('../controllers/archivoController');
const auth = require('../middleware/auth');

router.post('/',
    [
        check('nombre_original', "Sube un archivo").not().isEmpty(),
        check('nombre', "Sube un archivo").not().isEmpty(),
    ],
    auth,
    enlacesController.nuevoEnlace
);

router.get('/',
    enlacesController.todosEnlaces
);

router.get('/:url',
    enlacesController.tienePassword,
    enlacesController.obtenerEnlace
);

router.post('/:url',
    enlacesController.verificarPassword,
    enlacesController.obtenerEnlace
);

module.exports = router; 
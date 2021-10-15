const express = require("express");
const router = express.Router();
const { check } = require('express-validator')
const archivoController = require('../controllers/archivoController');
const auth = require('../middleware/auth');

router.post('/',
    auth,
    archivoController.subirArchivo
);
router.delete('/:id',
    auth,
    archivoController.eliminarArchivo
);

router.get('/:archivo',
    auth,
    archivoController.descargar,
    archivoController.eliminarArchivo
);



module.exports = router; 
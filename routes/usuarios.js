const express = require("express");
const router = express.Router();
const { check } = require('express-validator')
const usuarioController = require('../controllers/usuarioController');

router.post('/',
[
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email valido').isEmail(),
    check('email', 'El Password es obligatorio').isLength({min: 6}),
],
usuarioController.nuevousuario
);

module.exports = router; 
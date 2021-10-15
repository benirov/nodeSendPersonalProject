const Usuario = require('../models/Usurio');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require("dotenv").config({path: 'variables.env'});

exports.autenticarUsuario = async (req, res, next) => {

    //mostrar mensajes de error
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores : errores.array()})
    }
    

    //buscar usuario
    const { email, password } = req.body;
    let usuario = await Usuario.findOne({email});

    if(!usuario){
        res.status(401).json({msg: "Email no esta registrado"});
        return next();
    }

    //verificar password y autenticar
    if(!bcrypt.compareSync(password, usuario.password)){
        res.status(401).json({msg: "Password incorrecto"});
        return next();
    }

    const token = jwt.sign({
        id: usuario._id,
        nombre: usuario.nombre
    }, process.env.SECRETO, {
        expiresIn: '8h'
    });
    res.json({token});

} 

exports.usuarioAutenticado = async (req, res) => {

  
    return res.json({ usuario: req.usuario});

} 
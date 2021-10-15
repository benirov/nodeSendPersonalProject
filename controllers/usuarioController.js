const Usuario = require('../models/Usurio');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')

exports.nuevousuario = async (req, res) => {

    //mostrar mensajes de error
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores : errores.array()})
    }
    

    //verificar email
    const { email, password } = req.body;
    let usuario = await Usuario.findOne({email});

    if(usuario){
        return res.status(400).json({msg: "Usuario ya esta registrado"});
    }

    usuario =new Usuario(req.body);
    //hash password
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    usuario.save();
    res.json({msg: "Usuario registrado"});

} 
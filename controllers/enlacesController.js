const Enlace = require('../models/Enlace');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
require("dotenv").config({path: 'variables.env'});

exports.nuevoEnlace = async (req, res, next) => {

    console.log(req.body);

    //mostrar mensajes de error
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores : errores.array()})
    }
    

    //buscar usuario
    const { nombre_original, nombre } = req.body;

    const enlace = new Enlace();
    enlace.url = shortid.generate();
    enlace.nombre = nombre;
    enlace.nombre_original = nombre_original;

    if(req.usuario){
        const { password, descargas } = req.body;
        if(descargas) enlace.descargas;
        if(password)  {
            const salt = await bcrypt.genSalt(10);
            enlace.password = await bcrypt.hash(password, salt);
        }

        enlace.autor = req.usuario.id;
    }

    

    try {
        await enlace.save();
        return res.status(200).json({msg: `${enlace.url}`});
    } catch (error) {
        return res.status(500).json({error})
    }
}


exports.tienePassword = async (req, res, next) => {

    const { url } = req.params;
  //verirficar si existe la URL 

  console.log('url', url);

    const enlace = await Enlace.findOne({ url });

    if(!enlace){
        return res.status(404).json({msg: `No existe enlace`});
    }

    if(enlace.password){
        res.json({ password : true, enlace: enlace.url, archivo: enlace.nombre});
        next();
    }

}

exports.verificarPassword = async (req, res, next) => {

    const { url } = req.params;
    const { password } = req.body;
    const enlace = await Enlace.findOne({ url })
    //verirficar si existe la URL 

    if(bcrypt.compareSync( password, enlace.password )){
        next();
    }else{
        return res.status(401).json({msg: `Password incorrecto`});
    }

}


exports.obtenerEnlace = async (req, res, next) => {

  const { url } = req.params;
  //verirficar si existe la URL 
    const enlace = await Enlace.findOne({ url });

    if(!enlace){
        return res.status(404).json({msg: `No existe enlace`});
    }
     
    res.status(200).json({archivo: enlace.nombre, passwor : false});
    next();
} 

exports.todosEnlaces = async (req, res) => {

    try {
        const enlaces = await Enlace.find({}).select('url -_id');
        console.log('enlaces', enlaces);
        res.status(200).json({enlaces});
    } catch (error) {
        return res.status(500).json({error})
    }
  } 
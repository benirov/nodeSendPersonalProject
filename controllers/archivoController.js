const Enlace = require('../models/Enlace');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

exports.subirArchivo = async (req, res, next) => {

    const configuracionMulter = {
        limits : { fileSize : req.usuario ? 1024*1024*10: 1024*1024 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}`);
            }
        })
    }
    
    const upload = multer(configuracionMulter).single("archivo");

    upload(req, res, async error => {

        if(!error){
            res.json({archivo: req.file.filename})
        }else{
            console.log("hubo un error", error);
            return next();
        }
    });

} 

exports.eliminarArchivo = async (req, res, next) => {

    try {
        fs.unlinkSync(__dirname+`/../uploads/${req.archivo}`);
        console.log("Archivo eliminado");
    } catch (error) {
        console.log("hubo un error eliminando el archivo", error);
    }
} 

exports.descargar = async (req, res, next) => {

    const { archivo } = req.params;
    const enlace = await Enlace.findOne({nombre : archivo});
    console.log(enlace); 

    const archivoDw = __dirname + '/../uploads/'+archivo;
    res.download(archivoDw);
    if(enlace.descargas === 1){
        req.archivo = enlace.nombre;
        await Enlace.findOneAndRemove(enlace.id);
        next();
    }else{
        enlace.descargas--;
        await enlace.save();
    }
} 
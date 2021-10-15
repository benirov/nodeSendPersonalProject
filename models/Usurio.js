const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({  
    email: {
        type: String,
        require: true,
        unique:true,
        lowercase: true,
        trim: true
    },
    nombre :{
        type: String,
        require: true,
        trim: true
    },
    password : {
        type: String,
        require: true,
        trim: true
    },
});

module.exports = mongoose.model('Usuarios', UsuarioSchema);
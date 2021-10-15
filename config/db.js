const mongoose = require("mongoose");
require("dotenv").config({path: 'variables.env'});

const conexionDB = async () => {

    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
        });
        console.log("Conexion exitosa");
    } catch (error) {
        console.log("Hubo un error", error);
        process.exit(1);
    }
}

module.exports = conexionDB
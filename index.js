const express = require('express');
const conexionDB = require('./config/db');
const cors = require('cors');

const app = express();

//conectar a la db
conexionDB();
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}
app.use(cors());

const port = process.env.PORT || 4000;
app.use( express.json());

app.use( express.static('uploads') );

//rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));

app.listen(port, '0.0.0.0', () => {
    console.log("server run");
})
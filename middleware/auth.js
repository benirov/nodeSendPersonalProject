const jwt = require('jsonwebtoken');
require("dotenv").config({path: 'variables.env'});

module.exports = (req, res, next) => {

    const authHeader = req.get('authorization');
    if(authHeader){
        //obtener token 
        const token = authHeader.split(' ')[1];
        try {
        //comporbar toekn
            const usuario = jwt.verify(token, process.env.SECRETO);
            req.usuario = usuario 
        } catch (error) {
            console.log("error", error);
        }
    }

    return next();   
}
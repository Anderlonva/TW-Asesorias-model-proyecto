const mongoose = require('mongoose')

const getConnection = async () => {
    try {
        const url = process.env.MONGO_URL;

        await mongoose.connect(url, {
            
        });

        const Clientes = require('../models/Cliente')
        const TiposProyectos = require('../models/TipoProyecto')
        const Universidades = require('../models/Universidad')
        const Etapas = require('../models/Etapas')

        console.log("Conexion Exitosa");

    } catch (error) {
        console.log(error);
    }
}


module.exports = { getConnection }
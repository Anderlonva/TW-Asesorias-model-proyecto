const express = require('express');
const { getConnection } = require('./db/db-connect-mongo');
require('dotenv').config();  // es necesario para poder usar las variables de entorno en este caso PORT
const cors = require('cors');



const app = express();
const port = process.env.PORT // configuracion del puerto desde el archivo .env 

app.use(cors()); // implementacion de cors -> este sirve para que el frontend pueda consumir el backend desde
                // dominios diferentes 

getConnection();

app.use(express.json()); // Parseo Json

app.use('/proyecto', require('./router/proyecto'));

app.listen(port, () => {
    console.log(`API REST corriendo en el puerto ${port}`)
})


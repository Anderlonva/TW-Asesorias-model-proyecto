const {Schema, model} = require('mongoose');

const ProyectosSchema = Schema({

    numero: {
        type: String,
        required: true,
        unique: true
    },
    titulo: {
        type: String,
        required: true
    },
    fechaIniciacion: {
        type: Date,
        required: true
    },
    fechaEntrega: {
        type: Date,
        required: true
    },
    valor: {
        type: String,
        required: true
    },
    cliente: {  // <- este es el atributo que se usa en el path para hacer el join en el router-inventario
        type: Schema.Types.ObjectId, // se usa para relacionar por medio del id 
        ref: 'Clientes',              // se usa para hacer referencia hacia la tabla de la cual queremos el id
        required: true              // tambien es el mismo que exportamos desde el modelo
    },

    tipoProyecto: {
        type: Schema.Types.ObjectId,
        ref: 'TiposProyectos',
        required: true
    },

    universidad: {
        type: Schema.Types.ObjectId,
        ref: 'Universidades',
        required: true

    },

    etapaProyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Etapas',
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    fechaActualizacion: {
        type: Date,
        required: true
    }


});

module.exports = model('Proyectos', ProyectosSchema);
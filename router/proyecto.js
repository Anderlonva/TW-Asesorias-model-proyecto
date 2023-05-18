const { Router } = require('express');
const Proyecto = require('../models/Proyecto')
const { validarProyecto } = require('../helpers/validacion-proyecto')


const router = Router();

router.post('/', async function (req, res) {

    try {

        const validar = validarProyecto(req);

        if (validar.length > 0) {
            return res.status(400).send(validar);
        }
        
        let proyecto = new Proyecto();
        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaIniciacion = req.body.fechaIniciacion;
        proyecto.fechaEntrega = req.body.fechaEntrega;
        proyecto.valor = req.body.valor;
        proyecto.cliente = req.body.cliente._id;
        proyecto.tipoProyecto = req.body.tipoProyecto._id;
        proyecto.universidad = req.body.universidad._id;
        proyecto.etapaProyecto = req.body.etapaProyecto._id;
        proyecto.fechaCreacion = new Date();
        proyecto.fechaActualizacion = new Date();


        proyecto = await proyecto.save(); // lo guarda en la base de datos

        res.send(proyecto); // para mostrarlo como respuesta 

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error  ' + error);
    }

});

router.get('/', async function (req, res) {
    try {

        let proyectos = await Proyecto.find().populate([
            {
                path:'cliente',
                select: 'nombre email estado'
            },
            {
                path:'tipoProyecto',
                select: 'nombre'
            },
            {
                path:'universidad',
                select: 'nombre direccion telefono'
            },
            {
                path:'etapaProyecto',
                select: 'nombre'
            }
        ]);
        res.send(proyectos);

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:proyectoId', async function (req, res) {
    try {

        let proyecto = await Proyecto.findById(req.params.proyectoId); // se obtiene por medio del id

        if (!proyecto) {
            return res.status(400).send('proyecto no existe');
        }

        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fechaIniciacion = req.body.fechaIniciacion;
        proyecto.fechaEntrega = req.body.fechaEntrega;
        proyecto.valor = req.body.valor;
        proyecto.cliente = req.body.cliente._id;
        proyecto.tipoProyecto = req.body.tipoProyecto._id;
        proyecto.universidad = req.body.universidad._id;
        proyecto.etapaProyecto = req.body.etapaProyecto._id;
        proyecto.fechaActualizacion = new Date();


        proyecto = await proyecto.save(); // lo guarda en la base de datos

        res.send(proyecto); // para mostrarlo como respuesta 

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }
});

router.get('/:proyectoId', async function (req, res) { 
    try {
        let proyecto = await Proyecto.findById(req.params.proyectoId).populate([
            {
                path:'cliente',
                select: 'nombre email estado'
            },
            {
                path:'tipoProyecto',
                select: 'nombre'
            },
            {
                path:'universidad',
                select: 'nombre direccion telefono'
            },
            {
                path:'etapaProyecto',
                select: 'nombre'
            }
        ])

        if (!proyecto) {
            return res.status(404).send('proyecto no existe')
        }

        res.send(proyecto)

    } catch (error) {
        console.log(error);
    }
})

module.exports = router
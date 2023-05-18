const validarProyecto = (req) => {

    const validacion = [];

    if (!req.body.numero) {
        validacion.push('Numero requerido')
    }

    if (!req.body.titulo) {
        validacion.push('Titulo requerido')
    }

    if (!req.body.fechaIniciacion) {
        validacion.push('Fecha Iniciacion requerido')
    }

    if (!req.body.fechaEntrega) {
        validacion.push('Fecha Entrega requerido')
    }

    if (!req.body.valor) {
        validacion.push('Valor requerido')
    }

    if (!req.body.cliente) {
        validacion.push('Cliente requerido')
    }

    if (!req.body.tipoProyecto) {
        validacion.push('Tipo Proyecto requerido')
    }

    if (!req.body.universidad) {
        validacion.push('Universidad requerida')
    }

    if (!req.body.etapaProyecto) {
        validacion.push('Etapa Proyecto requerida')
    }

    return validacion;

}


module.exports = { validarProyecto };
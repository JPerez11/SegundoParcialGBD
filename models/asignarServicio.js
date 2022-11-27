const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asignarServiciosSchema = new Schema({
    idCliente: String,
    idServicio: String
});

const asignarServicio = mongoose.model('asignarServicio',asignarServiciosSchema);


module.exports=asignarServicio;
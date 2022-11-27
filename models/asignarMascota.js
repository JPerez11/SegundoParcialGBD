const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asignarMascotasSchema = new Schema({
    idMascota: String,
    idPropietario: String
});

const asignarMascota = mongoose.model('asignarMascota',asignarMascotasSchema);


module.exports=asignarMascota;
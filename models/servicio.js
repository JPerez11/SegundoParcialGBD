const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ServicioSchema =new Schema({
    descripcion: String,
    valor: String
});

const Servicio=mongoose.model('Servicio',ServicioSchema);

module.exports=Servicio;
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const propietarioSchema =new Schema({
    nombre:String,
    apellido:String,
    documento:String,
    telefono:String,
    direccion:String
});

const Propietario=mongoose.model('Propietario',propietarioSchema);

module.exports=Propietario;
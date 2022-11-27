const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacturaSchema =new Schema({
    idCliente: String,
    cliente: String,
    total: String
});

const Factura = mongoose.model('Factura',FacturaSchema);

module.exports = Factura;
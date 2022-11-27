const express = require('express');
const router = express.Router();

const AsignarMascota = require('../models/asignarMascota');
const AsignarServicio = require('../models/asignarServicio');
const Propietario = require('../models/propietario');
const Mascota = require('../models/mascota');
const Servicio = require('../models/servicio');
const Factura = require('../models/facturas');

router.get('/', async (req, res) => {
    try {
        const arrayFacturas = await Factura.find();
        console.log(AsignarServicio);
        res.render("facturas", {
            modulo: 'Modulo asignación',
            arrayFacturas
        });
    } catch (error) {
        console.log(error);
    }
})

router.get('/crearFactura', async (req, res) => {
    try {
        const arrayServicios = await AsignarServicio.find();
        let idCliente = [];
        let idServicio = [];
        for (let i = 0; i < arrayServicios.length; i++) {
            idCliente[i] = arrayServicios[i].idCliente;
            idServicio[i] = arrayServicios[i].idServicio;
        }
        const arrayClientes = await AsignarMascota.find({_id: idCliente});

        let idPropietario = [];
        let idMascota = [];
        for (let i = 0; i < arrayClientes.length; i++) {
            idPropietario[i] = arrayClientes[i].idPropietario;
            idMascota[i] = arrayClientes[i].idMascota;
        }
        const nombreClientes = await Propietario.find({_id: idPropietario});
        const nombreMascota = await Mascota.find({_id: idMascota});

        let arrayClienteMascota = [];
        let cont = 0;
        arrayClientes.forEach(e => {
            nombreClientes.forEach(c => {
                if (e.idPropietario === c.id) {
                    arrayClienteMascota[cont] = "Propietario: " + c.nombre;
                }
            });
            nombreMascota.forEach(m => {
                if (e.idMascota === m.id) {
                    arrayClienteMascota[cont] +=" - Mascota: " + m.nombre;
                }
            })
            cont++;
        });
        let arrayTotal = [];
        const arrayServiciosClientes = await Servicio.find({idServicio: idServicio});
        arrayClientes.forEach(c => {
            cont = 0;
            arrayServicios.forEach(s => {
                if (c.id === s.idCliente) {
                    arrayServiciosClientes.forEach(sc => {
                        if (s.idServicio === sc.id) {
                            cont+=Number(sc.valor);
                        }
                    })
                }
            })
            arrayTotal.push(cont);
        });
        console.log(arrayClienteMascota);
        console.log(Factura);
        res.render("crearFactura", {
            modulo: 'Elaborar factura',
            arrayClienteMascota,
            arrayServicios,
            arrayTotal,
            arrayClientes
        });
    } catch (error) {
        console.log(error);
    }
});


router.get('/verFactura/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const arrayMascotas = await AsignarServicio.find({idPropietario: id});
        console.log(arrayMascotas);
        res.render('verAsignacion', {
            arrayMascotas,
            error: false
        });
    } catch (error) {
        console.log('Error', error);
        res.render('verAsignacion', {
            error: true,
            mensaje: 'No se encuentra el documento...'
        })
    }
})

router.post('/', async (req,res) => {
    const body = req.body;
    console.log(body.idServicio);
    console.log(body);
    try{
        const arrayServicios = await AsignarServicio.find();
        let idCliente = body.idCliente;
        let idServicio = [];
        for (let i = 0; i < arrayServicios.length; i++) {
            idServicio[i] = arrayServicios[i].idServicio;
        }
        const arrayClientes = await AsignarMascota.find({_id: idCliente});

        let idPropietario = [];
        let idMascota = [];
        for (let i = 0; i < arrayClientes.length; i++) {
            idPropietario[i] = arrayClientes[i].idPropietario;
            idMascota[i] = arrayClientes[i].idMascota;
        }
        const nombreClientes = await Propietario.find({_id: idPropietario});
        const nombreMascota = await Mascota.find({_id: idMascota});

        let arrayClienteMascota;
        arrayClientes.forEach(e => {
            nombreClientes.forEach(c => {
                if (e.idPropietario === c.id) {
                    arrayClienteMascota = "Propietario: " + c.nombre;
                }
            });
            nombreMascota.forEach(m => {
                if (e.idMascota === m.id) {
                    arrayClienteMascota +=" - Mascota: " + m.nombre;
                }
            })
        });
        console.log(arrayClienteMascota);
        const arrayServiciosClientes = await Servicio.find({idServicio: idServicio});
        let total = 0;
        arrayServicios.forEach(s => {
            if (s.idCliente === body.idCliente) {
                arrayServiciosClientes.forEach(sc => {
                    if (s.idServicio === sc.id) {
                        total+=Number(sc.valor);
                    }
                })
            }
        })
        console.log(total)
        body.total = total;
        body.cliente = arrayClienteMascota;
        await Factura.create(body);
        res.redirect('/facturas');
    }catch(error){
        console.log('error',error);
    }
})

module.exports= router;
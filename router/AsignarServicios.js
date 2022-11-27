const express = require('express');
const router = express.Router();

const Servicio = require('../models/servicio');
const AsignarMascota = require('../models/asignarMascota');
const AsignarServicio = require('../models/asignarServicio');
const Propietario = require('../models/propietario');
const Mascota = require('../models/mascota');

router.get('/', async (req, res) => {
    try {
        const arrayServicios = await Servicio.find();
        const arrayClientes = await AsignarMascota.find();
        let idPropietario = [];
        let idMascota = [];
        for (let i = 0; i < arrayClientes.length; i++) {
            idPropietario[i] = arrayClientes[i].idPropietario;
            idMascota[i] = arrayClientes[i].idMascota;
        }
        const nombreClientes = await Propietario.find({_id: idPropietario});
        nombreClientes.forEach(e => {
            console.log(e.nombre)
        });
        const nombreMascota = await Mascota.find({_id: idMascota});
        nombreMascota.forEach(e => {
            console.log(e.nombre)
        });
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
        console.log(arrayClienteMascota);
        console.log(AsignarServicio);
        res.render("asignarServicio", {
            modulo: 'Modulo asignación',
            arrayServicios,
            arrayClientes,
            arrayClienteMascota
        });
    } catch (error) {
        console.log(error);
    }
})


router.get('/verAsignacion/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const arrayServicios = await AsignarServicio.find({idPropietario: id});
        console.log(arrayServicios);
        res.render('verAsignacion', {
            arrayServicios,
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
    const body = req.body
    console.log(body);
    try{
        await AsignarServicio.create(body);
        res.redirect('/servicios');
    }catch(error){
        console.log('error',error);
    }
})

module.exports= router;
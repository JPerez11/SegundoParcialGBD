const express = require('express');
const router = express.Router();

const Propietario = require('../models/propietario');
const Mascota = require('../models/mascota');
const AsignarMascota = require('../models/asignarMascota');

router.get('/', async (req, res)=>{
    try {
        const arrayPropietarios = await Propietario.find();
        const arrayMascotas = await Mascota.find();
        console.log(AsignarMascota);
        res.render("asignarMascota", {
            modulo: 'Modulo asignación',
            arrayPropietarios,
            arrayMascotas
        });
    } catch (error) {
        console.log(error);
    }
})


router.get('/verAsignacion/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const arrayMascotas = await AsignarMascota.find({idPropietario: id});
        let idMascota = [];
        for (let i = 0; i < arrayMascotas.length; i++) {
            idMascota[i] = arrayMascotas[i].idMascota;
        }
        const mascota = await Mascota.find({_id: idMascota});
        mascota.forEach(e => {
            console.log(e.nombre)
        });
        let nombreMascota = [];
        let cont = 0;
        arrayMascotas.forEach(e => {
            mascota.forEach(m => {
                if (e.idMascota === m.id) {
                    nombreMascota[cont] = m.nombre;
                }
            })
            cont++;
        });
        console.log(nombreMascota);
        console.log(arrayMascotas);
        res.render('verAsignacion', {
            arrayMascotas,
            nombreMascota,
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

router.post('/', async (req,res)=>{
    const body = req.body
    console.log(body);
    try{
        await AsignarMascota.create(body);
        res.redirect('/propietarios');
    }catch(error){
        console.log('error',error);
    }
})

module.exports= router;
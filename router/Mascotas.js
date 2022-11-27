const express=require("express");
const router =express.Router();

const Mascota = require('../models/mascota');

router.get('/', async (req,res)=> {
    try {
        const arrayMascotas = await Mascota.find();
        console.log(arrayMascotas);
        res.render("mascotas", {
            listaMascotas: 'Lista de mascotas',
            arrayMascotas
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/crearMascota', (req, res) => {
    res.render('crearMascota');
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const mascotaDB = await Mascota.findOne({_id: id});
        console.log(mascotaDB);
        res.render('detalleMascota', {
            mascota: mascotaDB,
            error: false
        });
    } catch (error) {
        console.log('Error', error);
        res.render('detalleMascota', {
            error: true,
            mensaje: 'No se encuentra el documento...'
        })
    }
})

// Metodo 2
router.post('/', async (req, res) => {
    const body = req.body;
    console.log(body);

    try {
        const mascotaDB = new Mascota(body);
        await mascotaDB.save();
        res.redirect('/mascotas');
    } catch (error) {
        console.log('error', error);
    }
});
// Metodo 2
router.post('/', async (req, res) => {
    const body = req.body;
    console.log(body);

    try {
        await Mascota.create(body);
        res.redirect('/mascotas');
    } catch (error) {
        console.log('error', error);
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    console.log(id);
    console.log('body', body);
    
    try {
        const mascotaDB = await Mascota.findByIdAndUpdate(id, body, {useFindAndModify: false});
        console.log(mascotaDB)
        res.json({
            estado: true,
            mensaje: 'Mascota editada'
        });
    } catch (error) {
        console.log(error);
        res.json({
            estado: false,
            mensaje: 'Error al actualizar'
        });
    }
})

module.exports=router;
const express=require("express");
const router =express.Router();

const Propietario = require('../models/propietario');

router.get('/', async (req,res)=> {
    try {
        const arrayPropietarios = await Propietario.find();
        console.log(arrayPropietarios);
        res.render("propietarios", {
            listaPropietarios: 'Lista de propietarios',
            arrayPropietarios
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/crearPropietario', (req, res) => {
    res.render('crearPropietario');
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const propietarioDB = await Propietario.findOne({_id: id});
        console.log(propietarioDB);
        res.render('detallePropietario', {
            propietario: propietarioDB,
            error: false
        });
    } catch (error) {
        console.log('Error', error);
        res.render('detallePropietario', {
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
        const propietarioDB = new Propietario(body);
        await propietarioDB.save();
        res.redirect('/propietarios');
    } catch (error) {
        console.log('error', error);
    }
});
// Metodo 2
router.post('/', async (req, res) => {
    const body = req.body;
    console.log(body);

    try {
        await Propietario.create(body);
        res.redirect('/propietarios');
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
        const propietarioDB = await Propietario.findByIdAndUpdate(id, body, {useFindAndModify: false});
        console.log(propietarioDB)
        res.json({
            estado: true,
            mensaje: 'Propietario editado'
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
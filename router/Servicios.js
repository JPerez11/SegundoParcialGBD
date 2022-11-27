const express=require("express");
const router =express.Router();

const Servicio = require('../models/servicio');

router.get('/', async (req,res)=> {
    try {
        const arrayServicios = await Servicio.find();
        console.log(arrayServicios);
        res.render("servicios", {
            listaServicios: 'Lista de servicios',
            arrayServicios
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/crearServicio', (req, res) => {
    res.render('crearServicio');
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const servicioDB = await Servicio.findOne({_id: id});
        console.log(servicioDB);
        res.render('detalleServicio', {
            servicio: servicioDB,
            error: false
        });
    } catch (error) {
        console.log('Error', error);
        res.render('detalleServicio', {
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
        const servicioDB = new Servicio(body);
        await servicioDB.save();
        res.redirect('/servicios');
    } catch (error) {
        console.log('error', error);
    }
});
// Metodo 2
router.post('/', async (req, res) => {
    const body = req.body;
    console.log(body);

    try {
        await Servicio.create(body);
        res.redirect('/servicios');
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
        const servicioDB = await Servicio.findByIdAndUpdate(id, body, {useFindAndModify: false});
        console.log(servicioDB)
        res.json({
            estado: true,
            mensaje: 'Servicio editado'
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
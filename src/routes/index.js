const express = require('express');
const router = express.Router(); //MOdulo que nos permite definir rutas del servidor

const home = require('../controllers/home');
const image = require('../controllers/image');

module.exports = app => {
    //Enrutadores
    // Enrutador de la funcion vista principal
    router.get('/', home.index);
    //Enrutador de imagen
    router.get('/images/:image_id', image.index);
    //Enrutador que me ayuda a subir imagenes
    router.post('/images', image.create);
    //Enrutador de likes
    router.post('/images/:image_id/like', image.like);
    //Enrutador para comentarios
    router.post('/images/:image_id/comment', image.comment);
    //Enrutador para eliminar imagenes
    router.delete('/images/:image_id', image.remove);

    app.use(router);
};
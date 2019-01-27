/* 
    Este archivo define la configuracion incial necesaria para el servidor,
    definiremos diferentes elementos por default que le indicaran al servidor
    en donde se encuentran rutas, archivos y extensiones de archivos por default.
*/

// El modulo path me ayuda a concatenar 2 url diferentes.
const path = require('path');
const exphbs = require('express-handlebars');

// Modulos
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const errorHandler = require('errorhandler'); 

// Rutas
const routes = require('../routes/index')

//Configuracion inicial del servidor
module.exports = app => {

    // Configuracion inicial, el puerto puede ser el que yo quiera, en este caso 3000
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    // La siguiente es la configuracion necesaria para poder utilizar handlebars, dentro del motor
    //.hbs -> handlebars, con esto le indicamos al servidor que los archivos que trabajaremos sera .hbs
    app.engine('.hbs', exphbs({
        // Con esto le indicamos que el layout por defecto es el main.
        defaultLayout: 'main',
        // Definimos la ruta de las plantillas.
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        // Definimos la extension de los archivos que usara el engine
        extname: '.hbs',
        helpers: require('./helpers')
    }));
    app.set('view engine', '.hbs');

    //funciones de proprocesado
    // middlewares : aquellos modulos comunican aplicaciones
    app.use(morgan('morgan'));
    // Ruta en la cual multer guardara los archivos que suba el cliente, necesita un input de nombre 'image'
    // el archivo seleccionado se subira a esa ruta con un nombre asignado por multer.
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
    app.use(express.urlencoded({extended: false})); //Recibo las imagenes que envian por formulario
    app.use(express.json());//Manejo de likes de la pagina


    // routes
    routes(app);

    //static files
    app.use('/public',express.static(path.join(__dirname,'../public')));//Hacemos publica la carpeta public

    //errorhandlers
    if('development' === app.get('env')){
        app.use(errorHandler);
    }

    return app;
}
//Archivo que define un controlador con un objeto ctrl, cuyo objeto solo define una funcion
const ctrl = {};

//Traemos el modelo de index
const { Image } = require('../models');

const sidebar = require('../helpers/sidebar');

ctrl.index = async (req, res) => {
    // Entramos a la base de datos y ordenamos las imagenes por fecha de carga.
    const images = await Image.find().sort({timestam: -1});
    let viewModel = {images: []};
    viewModel.images = images;
    viewModel = await sidebar(viewModel);
    // render me regresa un archivo renderizado que recibe por argumento
    //console.log(viewModel);
    res.render('index', viewModel);
};

module.exports = ctrl;
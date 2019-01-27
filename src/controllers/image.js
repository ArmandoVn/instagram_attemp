const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5');

const { Image, Comment } = require('../models/index');

const sidebar = require('../helpers/sidebar');

const ctrl = {};

ctrl.index = async (req, res) => {
    let viewModel = { image: {}, comments: {} };

    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image){
        image.views = image.views + 1;
        viewModel.image = image;
        await image.save();
        const comments = await Comment.find({image_id: image._id});
        viewModel.comments = comments;
        viewModel = await sidebar(viewModel);
        res.render('image', viewModel);
    }else{
        res.redirect('/');
    }
};

// Funcion encargada de nombrar y subir imagenes a la base de mongodb
ctrl.create = (req, res) => {
    // El metodo create mandara a llamar el metodo saveImage,
    // este metodo sera el encargado de validar si un numero de imagen
    // se repite o no y de hacerlo se volvera a llamar.
    const saveImage = async () => {
        const imgUrl = randomNumber();
        const images = await Image.find({filename: imgUrl});
        if (images.length > 0){
            saveImage();
        } else {
            const ext = path.extname(req.file.originalname).toLowerCase();
            const imageTempPath = req.file.path;
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
            /* multer almacena informacion importante del archivo dentro que sube el cliente
            y permite desplegar informacion de dicho archivo por medio del objeto request.*/
            if(ext === '.jpg' || ext === '.png' || ext === '.jepg' || ext === '.gif'){
                //fs.raname mueve el archivo del primer argumento a la ruta del segundo argumento
                await fs.rename(imageTempPath, targetPath);
                const newImg = new Image({
                    title: req.body.title,
                    filename: imgUrl + ext,
                    description: req.body.description
                });
                // Guardamos el objeto en la base de datos.
                const imageSave = await newImg.save();
                //res.redirect('/images');
                res.redirect('/images/' + imgUrl);
            } else { // En caso de que el tipo de archivo sea invalido este else borra el archivo de temmp
                // Elimina el archivo seleccionado.
                await fs.unlink(imageTempPath);
                // Respondemos un json con el error
                res.status(500).json({error: 'Only images are allowed'});
            }
        }
    };

    saveImage();

};

ctrl.like = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image){
        image.likes = image.likes + 1;
        await image.save();
        res.json({likes: image.likes});
    }else{
        res.status(404).json({error: 'Internal error'});
    }
};

ctrl.comment = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image){
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect('/images/' + image.uniqueId);
    }else{
        res.redirect('/');
    }
};

ctrl.remove = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image){
        //unlink remueve un dato de la direccion dada.
        await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
        //deleteOne elimina un dato.
        await Comment.deleteOne({image_id: image._id});
        //remove elimina el registro de la base de datos.
        await image.remove();
        res.json(true);
    }
};

module.exports = ctrl;
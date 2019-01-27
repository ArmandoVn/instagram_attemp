const mongoose = require('mongoose');
// Haremos uso del constructor Schema que sirve para crear un nuevo schema
// dentro de nuestra base de datos de mongo.
const { Schema } = mongoose;
const path = require('path');

const ImageSchema = new Schema({
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timestam: { type: Date, default: Date.now }
});

// Valor virtual que no se almacena dentro de la base de mongo.
ImageSchema.virtual('uniqueId')
    // get nos retornara el nombre de la imagen sin la extencion.
    .get(function () {
        return this.filename.replace(path.extname(this.filename),'')
    })

module.exports = mongoose.model('Image', ImageSchema);
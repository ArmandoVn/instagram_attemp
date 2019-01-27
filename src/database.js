//Biblioteca (ORM) para conectarnos a la base de datos.
const mongoose = require('mongoose');

/*
Lo coloco entre llaves porque estoy haciendo uso de destructuring de js
con lo que no necesito acceder a todo el objeto, sino a cierta parte del
mismo.
*/
const { database } = require('./keys');

mongoose.connect(database.URI, { 
    useNewUrlParser: true
})
    .then(db => console.log('DB is connect'))
    .catch(err => console.log(err));
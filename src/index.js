//Codigo necesario para la configuracion incial de express

const express = require('express');

const config = require('./server/config');

//Recordemos que al hacer uso de requiere, automaticamente se ejecuta
//lo que este dentro de ese archivo.

//start database
require('./database');

const app = config(express());

//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));    
});
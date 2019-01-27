const helpers = { };

helpers.randomNumber = () => {
    const possible = 'abdcdefghijklmnopqrsuvwxyz0123456789';
    let randomNumber = 0;
    for (let i = 0; i < 6; i++){
        // el metodo 'charAt' selecciona el caracter de la posicion dada
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomNumber;
}

module.exports = helpers;
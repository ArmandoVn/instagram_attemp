const moment = require('moment');

const helpers = {};

helpers.timeago = timestam => {
    // Obtiene el numero de minutos que han pasado desde 'x' fecha hasta ahora
    return moment(timestam).startOf('minute').fromNow();
};

module.exports = helpers;
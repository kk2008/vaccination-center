const moment = require('moment');
let get_dateTime = (input) => {
    var dateTime;
    if (!input) dateTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    else if (input) {
        if (typeof input == 'object') {
            dateTime = moment(input).format('YYYY-MM-DD HH:mm:ss');
        }
        else {
            input = new Date(`${input} GMT+8`);
            dateTime = moment(input).format('YYYY-MM-DD HH:mm:ss');
        }
    }
    return dateTime;
}
module.exports.get_dateTime = get_dateTime;

let nextID = (id) => {
    id = parseInt(id, 36);
    id = id + 1;
    id = id.toString(36).replace(/0/g, 'a');
    id = id.toUpperCase();
    return id;
}
module.exports.nextID = nextID;
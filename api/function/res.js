let solve = (res, data) => {
    return res.status(200).json(data);
}
module.exports.solve = solve;

let error = (res, error) => {
    return res.status(500).json(error);
}
module.exports.error = error;
// Importing Created Modules
const service = require("../services/Carts.service");

exports.post = (req, res, next) => {
    const d = new Date();
    let UniqueCode = 'SM-'+d.valueOf()+'-'+req.body.data.CreatedBy;
    const data = {
        CartCode : UniqueCode,
        CreatedBy: req.body.data.CreatedBy,
        CartStatus: 0,
    };

    service.post(data, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
        } else {
            return res.status(201).send(results);
        }
    });
};

exports.put = (req, res, next) => {
    const data = {
        CartId : req.params.id,
        CartCode : req.body.data.CartCode,
        CreatedBy: req.body.data.CreatedBy,
        CartStatus: req.body.data.CartStatus,
    };

    service.put(data, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
        } else {
            return res.status(200).send(results);
        }
    });
};

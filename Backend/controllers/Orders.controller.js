// Importing Created Modules
const service = require("../services/Orders.service");

exports.get = (req, res, next) => {
    const data = {};

    service.get(data, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
        } else {
            if (results.length > 0) {
                return res.status(200).send(results);
            } else {
                return res.status(204).send({ success: false, data: "No Data Found." });
            }
        }
    });
};

exports.getByCustomer = (req, res, next) => {
    const data = {
        Customer : req.params.id,
    };

    service.getByCustomer(data, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
        } else {
            if (results.length > 0) {
                return res.status(200).send(results);
            } else {
                return res.status(204).send({ success: false, data: "No Data Found." });
            }
        }
    });
};

exports.put = (req, res, next) => {
    const data = {
        OrderId : req.params.id,
        Deliveryman : req.body.data.Deliveryman,
        DeliveryDate: req.body.data.DeliveryDate,
        ApprovedBy: req.body.data.ApprovedBy,
        Status: req.body.data.Status,
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

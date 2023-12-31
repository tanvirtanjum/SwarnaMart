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

exports.getByDeliveryman = (req, res, next) => {
    const data = {
        Deliveryman : req.params.id,
    };

    service.getByDeliveryman(data, (error, results) => {
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

exports.getByStatus = (req, res, next) => {
    const data = {
        Status : req.params.id,
    };

    service.getByStatus(data, (error, results) => {
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

exports.getByStatusCustomer = (req, res, next) => {
    const data = {
        Status : req.params.id,
        Customer : req.params.cus,
    };

    service.getByStatusCustomer(data, (error, results) => {
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

exports.getByStatusDeliveryman = (req, res, next) => {
    const data = {
        Status : req.params.id,
        Deliveryman : req.params.del,
    };

    service.getByStatusDeliveryman(data, (error, results) => {
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

exports.getByStatusOrderMonthYear = (req, res, next) => {
    const data = {
        Status : req.params.id,
        Month : req.params.mm,
        Year : req.params.yyyy,
    };

    service.getByStatusOrderMonthYear(data, (error, results) => {
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

exports.getByStatusDeliveryMonthYear = (req, res, next) => {
    const data = {
        Status : req.params.id,
        Month : req.params.mm,
        Year : req.params.yyyy,
    };

    service.getByStatusDeliveryMonthYear(data, (error, results) => {
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
    var datetime = new Date();

    const data = {
        OrderId : req.params.id,
        Deliveryman : req.body.data.Deliveryman,
        DeliveryDate: req.body.data.Status != 2 ? req.body.data.DeliveryDate : datetime,
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

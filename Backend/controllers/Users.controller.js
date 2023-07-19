// Importing Created Modules
const service = require("../services/Users.service");

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

exports.getById = (req, res, next) => {
    const data = {
        UserId: req.params.id,
    };
    
    service.getById(data, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
        } else {
            if (results.length > 0) {
                return res.status(200).send(results[0]);
            } else {
                return res.status(204).send({ success: false, data: "No Data Found." });
            }
        }
    });

};

exports.getByLoginAccess = (req, res, next) => {
    const data = {
        LoginAccess: req.params.id,
    };
    
    service.getByLoginAccess(data, (error, results) => {
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

exports.postLogin = (req, res, next) => {
    const data = {
        UserName: req.body.data.UserName,
        Password: req.body.data.Password,
    };

    service.postLogin(data, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
        } else {
            if (results.length > 0) {
                return res.status(200).send(results[0]);
            } else {
                return res.status(204).send({ success: false, data: "No User Found." });
            }
        }
    });

};
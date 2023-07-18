// Importing Created Modules
const service = require("../services/Profiles.service");

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

exports.getByGroup = (req, res, next) => {
    const data = {
        GroupId : req.params.id,
    };

    service.getByGroup(data, (error, results) => {
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

exports.getByGroupExclude = (req, res, next) => {
    const data = {
        GroupId : req.params.id,
    };

    service.getByGroupExclude(data, (error, results) => {
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

exports.post = (req, res, next) => {
    const data = {
        Name: req.body.data.Name,
        Gender: req.body.data.Gender.Value,
        Phone: req.body.data.Phone,
        Address: req.body.data.Address,
        UserName: req.body.data.UserName,
        Password: req.body.data.Password,
        GroupId: req.body.data.GroupId.Value,
        LoginAccess: req.body.data.LoginAccess,
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
        ProfileId : req.params.id,
        UserId : req.body.data.UserId,
        Name: req.body.data.Name,
        Gender: req.body.data.Gender.Value,
        Phone: req.body.data.Phone,
        Address: req.body.data.Address,
        UserName: req.body.data.UserName,
        Password: req.body.data.Password,
        GroupId: req.body.data.GroupId.Value,
        LoginAccess: req.body.data.LoginAccess,
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

exports.delete = (req, res, next) => {
    const data = {
        ProfileId : req.params.id
    };

    service.delete(data, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
        } else {
            return res.status(204).send(results);
        }
    });
};

exports.getByName = (req, res, next) => {
    const data = {
        Name : '%' + req.params.name + '%'
    };

    service.getByName(data, (error, results) => {
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

exports.getByNameGroup = (req, res, next) => {
    const data = {
        Name : '%' + req.params.name + '%',
        GroupId : req.params.id,
    };

    service.getByNameGroup(data, (error, results) => {
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

exports.getByNameGroupExclude = (req, res, next) => {
    const data = {
        Name : '%' + req.params.name + '%',
        GroupId : req.params.id,
    };

    service.getByNameGroupExclude(data, (error, results) => {
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



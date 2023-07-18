// Importing Created Modules
const service = require("../services/Products.service");
var fs = require('fs');

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

exports.post = (req, res, next) => {
    const data = {
        Title: req.body.data.Title,
        UnitPrice: req.body.data.UnitPrice,
        Description: req.body.data.Description,
        ImagePath : 'uploads\\SM_NO_IMAGE.jpg',
        IsStock: req.body.data.IsStock,
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
        ProductId : req.params.id,
        Title: req.body.data.Title,
        UnitPrice: req.body.data.UnitPrice,
        Description: req.body.data.Description,
        IsStock: req.body.data.IsStock,
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
        ProductId : req.params.id
    };

    service.delete(data, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
        } else {
            if(req.query.PrivFilePath && req.query.PrivFilePath.length > 0 && req.query.PrivFilePath != 'uploads\\SM_NO_IMAGE.jpg'){
                try {
                    fs.unlinkSync(req.query.PrivFilePath)
                    //file removed
                } 
                catch(err) {
                    console.error(err)
                }
            }
            return res.status(204).send(results);
        }
    });
};

exports.getByTitle = (req, res, next) => {
    const data = {
        Title : '%' + req.params.name + '%'
    };

    service.getByTitle(data, (error, results) => {
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

exports.getByStock = (req, res, next) => {
    const data = {
        IsStock : req.params.id
    };

    service.getByStock(data, (error, results) => {
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

exports.upload = (req, res, next) => {
    const data = {
        ProductId : req.params.id,
        ImagePath : (req.file && req.file.path) ? req.file.path : 'uploads\\SM_NO_IMAGE.jpg'
    };


    service.upload(data, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
        } else {
            if(req.query.PrivFilePath && req.query.PrivFilePath.length > 0 && req.query.PrivFilePath != 'uploads\\SM_NO_IMAGE.jpg'){
                try {
                    fs.unlinkSync(req.query.PrivFilePath)
                    //file removed
                } 
                catch(err) {
                    console.error(err)
                }
            }
            return res.status(200).send(results);
        }
    });
};

exports.getByTitleAndStock = (req, res, next) => {
    const data = {
        IsStock : req.params.id,
        Title : '%' + req.params.name + '%'
    };

    service.getByTitleAndStock(data, (error, results) => {
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
// Importing Created Modules
const service = require("../services/CartItems.service");

exports.post = (req, res, next) => {
    const data = {
        Product : req.body.data.Product,
        Quantity: req.body.data.Quantity,
        CartRef: req.body.data.CartRef,
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

exports.checkProductInCart = (req, res, next) => {
    const data = {
        Product : req.params.product,
        CartRef: req.params.cartref,
    };

    service.checkProductInCart(data, (error, results) => {
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

exports.getCartItems = (req, res, next) => {
    const data = {
        CartRef: req.params.cartref,
    };

    service.getCartItems(data, (error, results) => {
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
        CartItemId : req.params.id,
        Product : req.body.data.Product,
        Quantity: req.body.data.Quantity,
        CartRef: req.body.data.CartRef,
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
        CartItemId : req.params.id
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

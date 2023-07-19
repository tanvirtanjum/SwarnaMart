const controller = require("../controllers/Orders.controller");
// const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get", controller.get);
router.get("/get/customer/:id", controller.getByCustomer);

module.exports = router;
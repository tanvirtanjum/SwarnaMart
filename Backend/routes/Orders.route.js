const controller = require("../controllers/Orders.controller");
// const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get", controller.get);
router.get("/get/customer/:id", controller.getByCustomer);
router.get("/get/deliveryman/:id", controller.getByDeliveryman);
router.get("/get/status/:id", controller.getByStatus);
router.get("/get/status/:id/customer/:cus", controller.getByStatusCustomer);
router.get("/get/status/:id/deliveryman/:del", controller.getByStatusDeliveryman);
router.get("/get/status/:id/orderdate/month/:mm/year/:yyyy", controller.getByStatusOrderMonthYear);
router.get("/get/status/:id/deliverydate/month/:mm/year/:yyyy", controller.getByStatusDeliveryMonthYear);
router.put("/put/:id", controller.put);

module.exports = router;
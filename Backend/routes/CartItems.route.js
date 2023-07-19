const controller = require("../controllers/CartItems.controller");
// const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.post("/post", controller.post);
router.get("/get/product/:product/cartref/:cartref", controller.checkProductInCart);
router.get("/get/cartref/:cartref", controller.getCartItems);
router.put("/put/:id", controller.put);
router.delete("/:id/delete", controller.delete);

module.exports = router;
const controller = require("../controllers/Carts.controller");
// const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.post("/post", controller.post);
router.put("/put/:id", controller.put);
//router.post("/login", controller.getLogin);

module.exports = router;
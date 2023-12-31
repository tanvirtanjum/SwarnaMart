const controller = require("../controllers/Users.controller");
// const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get", controller.get);
router.get("/:id/get", controller.getById);
router.get("/get/LoginAccess/:id", controller.getByLoginAccess);
router.get("/get/username/:UserName", controller.getByUserName);
router.get("/get/role/:id", controller.getByRole);
router.post("/login", controller.postLogin);
//router.post("/login", controller.getLogin);

module.exports = router;
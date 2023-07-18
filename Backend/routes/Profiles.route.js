const controller = require("../controllers/Profiles.controller");
// const auth = require("../middleware/authenticate.middleware");

var express = require("express");

var router = express.Router();

router.get("/get", controller.get);
router.get("/get/group/:id", controller.getByGroup);
router.get("/get/group/exclude/:id", controller.getByGroupExclude);
router.post("/post", controller.post);
router.put("/:id/put", controller.put);
router.delete("/:id/delete", controller.delete);
router.get("/get/name/:name", controller.getByName);
router.get("/get/name/:name/group/:id", controller.getByNameGroup);
router.get("/get/name/:name/group/exclude/:id", controller.getByNameGroupExclude);

module.exports = router;
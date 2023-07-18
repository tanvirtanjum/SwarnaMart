const controller = require("../controllers/Products.controller");
// const auth = require("../middleware/authenticate.middleware");
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + "-" + file.originalname)
    }
  })
  
const upload = multer({ storage: storage });



var express = require("express");

var router = express.Router();

router.get("/get", controller.get);
router.post("/post", controller.post);
router.put("/:id/put", controller.put);
router.delete("/:id/delete", controller.delete);
router.get("/get/title/:name", controller.getByTitle);
router.get("/get/stock/:id", controller.getByStock);
router.post("/:id/post/upload", upload.single('file'), controller.upload);
router.get("/get/title/:name/stock/:id", controller.getByTitleAndStock);

module.exports = router;
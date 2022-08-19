const router = require("express").Router();
const controller = require("../controllers/destination");
const upload = require("../middlewares/upload");

router.route("/destination").get(controller.getAllPlace).post(upload.single("destination_image"), controller.addData);
router.route("/destination/:id").get(controller.getById).patch(upload.single("destination_image"), controller.updateData).delete(controller.deleteData);
router.route("/destinations/:name").get(controller.getByName);

module.exports = router;

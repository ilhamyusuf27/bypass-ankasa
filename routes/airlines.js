const router = require("express").Router();
const controller = require("../controllers/airlines");
const upload = require("../middlewares/upload");

router.route("/airlines").get(controller.getAllAirlines).post(upload.single("destination_image"), controller.addData);
router.route("/airlines/:id").get(controller.getById).patch(upload.single("destination_image"), controller.updateData).delete(controller.deleteData);
router.route("/airline/:name").get(controller.getByName);

module.exports = router;

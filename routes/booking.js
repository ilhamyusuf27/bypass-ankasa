const router = require("express").Router();
const controller = require("../controllers/booking");

router.route("/booking").get(controller.getAllBooking).post(controller.booking);
router.route("/books/:id").get(controller.getById).delete(controller.deleteData);
router.route("/booking/accept/:id").patch(controller.acceptAdmin);
router.route("/booking/cancel/:id").patch(controller.cancelBooking);
router.route("/booking/user/:id").get(controller.getByUserId);

module.exports = router;

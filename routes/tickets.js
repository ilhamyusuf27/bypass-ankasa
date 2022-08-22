const router = require("express").Router();
const controller = require("../controllers/tickets");

router.route("/tickets").get(controller.getAllTickets).post(controller.createTicket);
router.route("/tickets/all/detail").get(controller.getAllTicketsDetail);
router.route("/tickets/detail").get(controller.getDetail);
router.route("/ticket/:id").get(controller.getById).patch(controller.updateTicket).delete(controller.deleteTicket);

module.exports = router;

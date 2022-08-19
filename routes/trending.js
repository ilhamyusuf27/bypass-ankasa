const router = require("express").Router();
const controller = require("../controllers/trending");

router.route("/trending").get(controller.getTrending);
router.route("/trending/destination").get(controller.getTenTrending);

module.exports = router;

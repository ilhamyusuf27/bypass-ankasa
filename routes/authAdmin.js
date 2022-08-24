const router = require("express").Router();
const { tokenSign } = require("../middlewares/jwt");
const { passwordHash, passwordCompare } = require("../middlewares/bcrypt");
const { login } = require("../controllers/authAdmin");

router.post("/login/admin", login, passwordCompare, tokenSign);

module.exports = router;

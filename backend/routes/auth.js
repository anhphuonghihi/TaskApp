const router = require("express").Router();

const user = require("../controllers/user");
const auth = require("../middleware/auth");
router.post("/register", user.register);
router.post("/login", user.login);
router.get("/info", auth, user.getUser);

module.exports = router;

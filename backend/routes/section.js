const section = require("../controllers/section");
const router = require("express").Router();
const auth = require("../middleware/auth");
router.route("/").post(auth, section.create);
router.route("/:id").delete(auth, section.delete).put(auth, section.update);

module.exports = router;

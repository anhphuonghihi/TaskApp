const router = require("express").Router();
const task = require("../controllers/task");
const auth = require("../middleware/auth");
router.route("/").post(auth, task.create);
router.route("/position").put(auth, task.position);
router.route("/:id").delete(auth, task.delete).put(auth, task.update);

module.exports = router;

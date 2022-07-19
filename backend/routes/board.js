const router = require("express").Router();
const board = require("../controllers/board");
const auth = require("../middleware/auth");
router.route("/").get(board.gets).post(auth, board.create);
router
  .route("/favourites")
  .get(board.getFavourites)
  .post(auth, board.updateFavouritePosition);
router
  .route("/:id")
  .get(board.getOne)
  .delete(auth, board.delete)
  .put(auth, board.update);

module.exports = router;

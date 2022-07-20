const router = require("express").Router();
const board = require("../controllers/board");
const auth = require("../middleware/auth");
router
  .route("/")
  .get(auth, board.gets)
  .post(auth, board.create)
  .put(auth, board.updatePosition);
router
  .route("/favourites")
  .get(auth, board.getFavourites)
  .put(auth, board.updateFavouritePosition);
router
  .route("/:id")
  .get(board.getOne)
  .delete(auth, board.delete)
  .put(auth, board.update);

module.exports = router;

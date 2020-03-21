const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"
router.route("/")
  .post(userController.createUser);

// Matches with "/api/user/:email"
router.route("/:email")
  .get(userController.findUserByEmail)
  .put(userController.updateUserByEmail)

module.exports = router;

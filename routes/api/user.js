const router = require("express").Router();
const userController = require("../../controllers/userController");


router.route("/")
  .post(userController.createUser);


router
  .route("/:email")
  .get(userController.findByEmail)
  .put(userController.updateByEmail)

module.exports = router;

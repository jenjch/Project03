const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require("../../config/passport");

// Matches with "/api/user"
router.route("/")
  .post(userController.createUser);

// log in route (create function in controller) - JC
router.route("/login")
.post(passport.authenticate("local"), userController.login);
  // .post((req, res) => passport.authenticate("local") (req, res), userController.login);

  // used for testing 
// router.route("/posttest")
//   .post((req, res) => {
//     console.log(req.body);
//     res.send("hello world");
//   } )

// Matches with "/api/user/:email"
router.route("/:email")
  .get(userController.findUserByEmail)
  .put(userController.updateUserByEmail)

module.exports = router;

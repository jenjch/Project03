const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require("../../config/passport");
const authenticated = require("../../models/middleware/isAuthenticated.js");

// Matches with "/api/user"
router.route("/").post(userController.createUser);

// test get route
router.route("/").get((req, res, next) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    console.log("success")
    res.send({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

// log in route (create function in controller) - JC
router
  .route("/login")
  .post(userController.login, passport.authenticate("local"), (req, res) => {
    console.log("logged in", req.user);
    var userInfo = {
      email: req.user.email
    };
    res.send(userInfo);
  });
// .post((req, res) => passport.authenticate("local") (req, res), userController.login);
// using this without passport (placed in the userController.js file instead results in empty JSON in postman)
// .post(userController.login);

router.route("/testlogin").post(authenticated, (req, res) => {
  res.json(req.user);
});

// used for testing
// router.route("/posttest")
//   .post((req, res) => {
//     console.log(req.body);
//     res.send("hello world");
//   } )

// Matches with "/api/user/:email"
router
  .route("/:email")
  .get(userController.findUserByEmail)
  .put(userController.updateUserByEmail);

module.exports = router;

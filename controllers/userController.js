const db = require("../models");
const passport = require("../config/passport.js");

module.exports = {
  findUserByEmail: function(req, res) {
    db.User.findOne({ email: req.params.email })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // user needs to be redirected (and logged in) after signup - JC
  createUser: function(req, res) {
    console.log("testing1", req.body);
    db.User.create(req.body)
      .then(() => {
        console.log("user created!");
        // redirect needs to be handled on the frontend in React
        // res.redirect(307, "/trips");
        // moved this passport to the login function
        // passport.authenticate("local");

        // need to find way to send created user data to log in
        res.send("User Created!");
        // login();
      })
      .catch(err => {
        console.log("error", err);
        res.status(422).json(err);
      });
  },

  login: function(req, res, next) {
    console.log("routes/user.js, login, req.body: ");
    console.log(req.body);
    next();
  },

  // connected to logout link click event on nav component) - JC
  logout: function(req, res) {
    // Route for logging user out
    req.logout();
    // "Logged Out!" message doesn't seem to show on browser console (but logout works?)
    res.send("Logged Out!");
    console.log("log out req.body", req.body);
    // if (req.user) {
    //   req.logout();
    //   res.send({ msg: "logging out" });
    // } else {
    //   res.send({ msg: "no user to log out" });
    // }
  },

  // need to figure out if this is necessary - using global context
  // Route for getting some data about our user to be used client side
  // app.get("/api/user_data", function(req, res) {
  //   if (!req.user) {
  //     // The user is not logged in, send back an empty object
  //     res.json({});
  //   } else {
  //     // Otherwise send back the user's email and id
  //     // Sending back a password, even a hashed password, isn't a good idea
  //     res.json({
  //       email: req.user.email,
  //       id: req.user.id
  //     });
  //   }
  // });

  updateUserByEmail: function(req, res) {
    db.User.findOneAndUpdate({ email: req.params.email }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

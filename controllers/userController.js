const db = require("../models");

module.exports = 
{
  findUserByEmail: function(req, res) {
    db.User
      .findOne({ email: req.params.email})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // user needs to be redirected (and logged in) after signup - JC
  createUser: function(req, res) {
    console.log("testing1", req.body);
    db.User
      .create(req.body)
      .then(() => {
        console.log ("user created!")
        // redirect needs to be handled on the frontend in React
        // res.redirect(307, "/trips");
        res.send("User Created!");
      })
      .catch(err => {
        console.log("error", err);
        res.status(422).json(err); 
      });
  },


  // double check on sending log in data (need to fix) - JC
  login: function (req, res) {
    res.json(req.user);
    console.log("req.user", req.user);
  },

  updateUserByEmail: function(req, res) {
    db.User
      .findOneAndUpdate({email: req.params.email }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};

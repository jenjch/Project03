const db = require("../models");

module.exports = 
{
  findTripsByEmail: function(req, res) {
    db.Trips
      .findOne({ email: req.params.email})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createTrips: function(req, res) {
    db.Trips
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateTripsByEmail: function(req, res) {
    db.Trips
      .findOneAndUpdate({email: req.params.email }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

};


//NOTE: because we will be downloading the ENTIRE list of trips (to populate buttons), we will always be using update/put for modifying/deleting
//anything in that area.  Thus there is no need for a delete function.
const db = require("../models");

module.exports = 
{
  findTripsByEmail: function(req, res) {
    db.Trips
      .find({ email: req.params.email})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createTrip: function(req, res) {
    db.Trips
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  deleteTripByID: function(req, res) {
    db.Trips
      .findByIdAndDelete(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  createReceiptWithTripID: function(req, res) {
    db.Trips
      .findByIdAndUpdate(req.params.id, {$push: {receipts: req.body} })       //this ID is the trip ID
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  deleteReceiptByID: function(req, res) {                                     //JASON ... is this actually an update or delete (see comments below)
    db.Trips
      .findOneAndDelete(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};


//pull function for removing receipt from array?

//https://mongoosejs.com/docs/subdocs.html#adding-subdocs-to-arrays
//Each subdocument has an _id by default. 
//Mongoose document arrays have a special id method for searching a document array to find a document with a given _id.
//var doc = parent.children.id(_id);

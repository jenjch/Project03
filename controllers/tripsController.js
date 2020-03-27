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


  findReceiptsByTripID: function(req, res) {
    db.Trips                                                    
      .findById({_id:req.params.id})
      .then(dbModel => res.json(dbModel))                   
      .catch(err => res.status(422).json(err));
  },


  deleteReceiptByID: function(req, res) { 
    db.Trips
      .findByIdAndUpdate(req.params.id,                               //this is the search for the parent trip ID
        { $pull: { receipts: req.body } },                            //then within the parent, this pulls the subdoc
        { new: true }                                                 //this ensures the existing document is overwritten.
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
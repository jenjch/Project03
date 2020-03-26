const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const receiptSchema = new Schema(
  {
    receiptname: { type: String },
    receiptdate: { type: String },
    currency: { type: String },
    foreignamount: { type: Number },
    USDamount: { type: Number },
  }
);

const tripSchema = new Schema(
  {
    email: { type: String, required: true },
    tripname: { type: String, required: true },
    receipts: [receiptSchema]
  }
);
  
const Trips = mongoose.model("Trips", tripSchema);
module.exports = Trips;


// NOTE: the trips array should be a series of tripname:receiptobject value-pair, where the receiptobject is also a series of value pairs
// In react, write a mongoose query like { "trip.tripname": "London" }
//
    // {
    //   "email":"j@email.com", 
    //   "tripname":"London",
    //   "receipts":
    //     [
    //       "receiptid": {receiptname:"hotel", receiptdate:"2020-10-10", currency:"EUR", foreignamount:"110", USDamount:"100"}
    //     ]
    //  }

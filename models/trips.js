const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema(
[ 
  {
    email: { type: String, required: true, unique: true },
    tripname: { type: String},
    receipts: [ ]
  }
]);

const Trips = mongoose.model("Trips", tripSchema);

module.exports = Trips;


// NOTE: the trips array should be a series of tripname:receiptobject value-pair, where the receiptobject is also a series of value pairs
// In react, write a mongoose query like { "trips.tripname": "Paris" }
//
//
// 	trips:
//  [
// 		{
//    email: "jason@email.com"  
// 		tripname: "London",
//    receipts:
//      {
// 		    receiptid: {receiptname:"", receiptdate:"", currency:"", foreignamount:"", USDamount:""},
//        receiptid: {receiptname:"", receiptdate:"", currency:"", foreignamount:"", USDamount:""},
//      }
// 		}
//
// 		{
//    email: "jason@email.com"  
// 		tripname: "Paris",
//    receipts:
//      {
// 		    receiptid: {receiptname:"", receiptdate:"", currency:"", foreignamount:"", USDamount:""},
//        receiptid: {receiptname:"", receiptdate:"", currency:"", foreignamount:"", USDamount:""},
//      }
// 		}
// 	]
// 

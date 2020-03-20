const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  trips:
  [ 
    {
      tripname: { type: String},
      receipts: [ ]
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;


// NOTE: the trips array should be a series of tripname:receiptobject value-pair, where the receiptobject is also a series of value pairs
// In react, write a mongoose query like { "trips.tripname": "Paris" }
// 	trips:
//  [
// 		{
// 		tripname: "London",
//    receipts:
//      {
// 		    receiptid: {receiptname:"", receiptdate:"", currency:"", foreignamount:"", USDamount:""},
//        receiptid: {receiptname:"", receiptdate:"", currency:"", foreignamount:"", USDamount:""},
//      }
// 		}
//
// 		{
// 		tripname: "Paris",
//    receipts:
//      {
// 		    receiptid: {receiptname:"", receiptdate:"", currency:"", foreignamount:"", USDamount:""},
//        receiptid: {receiptname:"", receiptdate:"", currency:"", foreignamount:"", USDamount:""},
//      }
// 		}
// 	]
// }

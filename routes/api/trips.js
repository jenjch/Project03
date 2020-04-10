const router = require("express").Router();
const tripsController = require("../../controllers/tripsController");
const nodemailer = require("nodemailer");

// Matches with "/api/trips"
router.route("/")
  .post(tripsController.createTrip);

// Matches with "/api/trips/:email"
router.route("/:email")
  .get(tripsController.findTripsByEmail)

// Matches with "/api/trips/:id"
router.route("/:id")
  .delete(tripsController.deleteTripByID)

// Matches with "/api/trips/receipt/:id"
router.route("/receipt/:id")
.put(tripsController.createReceiptWithTripID)

router.route("/receipt/:id")
.get(tripsController.findReceiptsByTripID)

// Matches with "/api/trips/receiptdelete/:id"
router.route("/receiptdelete/:id")
.put(tripsController.deleteReceiptByID)


//send email using nodemailer - moved from server.js
let transporter = nodemailer.createTransport({
  service: "yahoo",
  auth: {
    user: "bootcamp_project@yahoo.com",
    pass: process.env.yahooPW,
  },
  debug: true,
  logger: true,

  //NOTE: yahoo is one of the listed providers for this npm, so the following three attributes are already baked in
  //host: "smtp.mail.yahoo.com",
  //port: 465,
  //secure: true, // true for 465, false for other ports
});

// route for nodemailer
router.post("/send", (req, res, next) => {

  const name = req.body.name;
  console.log("name: ", name);

  const receiptsBody = req.body.receiptsBody;
  console.log("receiptsBody", receiptsBody);

  // const name = req.body.name;
  const email = receiptsBody.email;
  const tripName = receiptsBody.tripname;

  // function to total all receipts (USD) in the object
  const total = receiptsBody.receipts.reduce(
    (first, second) => first + second.USDamount,
    0
  ).toFixed(2);

  console.log(total);

  // creating html template for email body
  const htmlBody = `
    <h1>${receiptsBody.tripname}</h1>

    <br/>

    ${receiptsBody.receipts
      .map(
        ({ receiptdate, receiptname, currency, foreignamount, USDamount }) => `
            <p>${
              receiptdate +
              ": " +
              receiptname +
              " (" +
              currency +
              " " +
              foreignamount +
              ") - USD $" +
              USDamount
            }</p>
        `
      )
      .join("")}

    <br/>

    <h3>Total: $${total}</h3>

    <br/>

    <p> See more at <a href='https://warm-depths-70998.herokuapp.com'> Convert-a-Trip</a>!</p>
  `;

  const mailOptions = {
    from: "bootcamp_project@yahoo.com",
    to: email,
    subject: name + "'s " + tripName + " Receipts",
    text: name + " (" + email + ")",
    html: htmlBody,
  };

  console.log("mailOptions:");
  console.log(mailOptions);
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Transporter error: " + error);
    } else {
      console.log("Email sent: " + info.response);
    }
    res.end();
  });
});


module.exports = router;
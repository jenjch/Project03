require('dotenv').config()

const PORT = process.env.PORT || 3001;

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const passport = require("./config/passport");
const nodemailer = require("nodemailer");
const cors = require ('cors');

// The app works fine as is for development, but in production express-session can’t handle more than one user at a time, so connect-mongo stores session info in your database.
// Then if you sign up a new user, you can see the session id and cookie in your database

// from mern example 
const MongoStore = require("connect-mongo")(session);
// const morgan = require('morgan')
// app.use(morgan('dev'))

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// sessions to track login status (mongo)
app.use(
  session({ 
    // turn to ENV variable 
    secret: "keyboard cat",
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    resave: true, //required
    saveUninitialized: false //required 
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
// changed db name to reacttrips instead of reactrecipes - JC
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reacttrips", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

// original from sequelize example
// app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

//FOR SQL VERSION
//const db = require("./models");
//require("./routes/html-routes.js")(app);
//require("./routes/api-routes.js")(app);
//db.sequelize.sync({ force: true }).then(function() {app.listen(PORT, function() {console.log("App listening on PORT " + PORT)})});

//send email using nodemailer
let transporter = nodemailer.createTransport(
  {
    service:"yahoo",
    auth: 
    {
        user: "bootcamp_project@yahoo.com",
        pass: process.env.yahooPW
    },
    debug: true,
    logger: true
  
    //NOTE: yahoo is one of the listed providers for this npm, so the following three attributes are already baked in
    //host: "smtp.mail.yahoo.com",
    //port: 465,
    //secure: true, // true for 465, false for other ports
  });

  app.post("/send", (req, res, next) => 
{
  const name = req.body.name
  const email = req.body.email
  const tripName = req.body.tripName
  const receiptsBody = req.body.receiptsBody
  // const name = req.body.name
  // const email = req.body.email
  // const message = req.body.message
    
  const mailOptions = 
  {
      from: "bootcamp_project@yahoo.com",
      to: req.body.email,
      subject: "Your " + tripName + " Receipts",
      text: name + " (" + email + "): ",
      html: "<p>" + receiptsBody + "</p>"
  };
        
  console.log ("mailOptions:");
  console.log (mailOptions);
  transporter.sendMail(mailOptions, function(error, info)
  {
      if (error) 
      {console.log('Transporter error: ' + error)} 
      else 
      {console.log('Email sent: ' + info.response)}
      res.end()
  });
})
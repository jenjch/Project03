const PORT = process.env.PORT || 3001;

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const passport = require("./config/passport");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") 
{
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// sessions to track login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Connect to the Mongo DB
// changed db name to reacttrips instead of reactrecipes - JC
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reacttrips",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);


// Start the API server
app.listen(PORT, function() 
{
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});


//FOR SQL VERSION
//const db = require("./models");
//require("./routes/html-routes.js")(app);
//require("./routes/api-routes.js")(app);
//db.sequelize.sync({ force: true }).then(function() {app.listen(PORT, function() {console.log("App listening on PORT " + PORT)})});

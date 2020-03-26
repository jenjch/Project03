const path = require("path");
const router = require("express").Router();


//const apiRoutes = require("./api");
const userRoutes = require("./api/user");
const tripsRoutes = require("./api/trips");

// part of endpoint for api route, removed the period "."
router.use("/api/user", userRoutes);
router.use("/api/trips", tripsRoutes);
//router.use("/api", apiRoutes);


// not right way path should be written for React - JC

// If no API routes are hit, send the React app
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });


module.exports = router;

const router = require("express").Router();
const tripsController = require("../../controllers/tripsController");

// Matches with "/api/user"
router.route("/")
  .post(tripsController.createTrips);

// Matches with "/api/user/:id"
router.route("/:email")
  .get(tripsController.findTripsByEmail)
  .put(tripsController.updateTripsByEmail)

module.exports = router;

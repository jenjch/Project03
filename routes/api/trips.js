const router = require("express").Router();
const tripsController = require("../../controllers/tripsController");

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
.delete(tripsController.deleteReceiptByID)

router.route("/receipt/:id")
.get(tripsController.findReceiptsByTripID)

module.exports = router;
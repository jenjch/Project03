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
.get(tripsController.findReceiptsByTripID)

// Matches with "/api/trips/receiptdelete/:id"
router.route("/receiptdelete/:id")
.put(tripsController.deleteReceiptByID)

module.exports = router;
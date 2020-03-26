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
.post(tripsController.createReceiptWithTripID)
.delete(tripsController.deleteReceiptByID)               //JASON, is this update or delete on the array?  (You don't want to delete the entire array!)

module.exports = router;
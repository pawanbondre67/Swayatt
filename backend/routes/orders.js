const express = require("express");
const { check } = require("express-validator");
const orderController = require("../controllers/orderController");
const auth = require("../middlewares/auth");
// const { validateOrder, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Create Order
router.post("/create-order", [auth], orderController.createOrder);

// Update Order Status
router.put(
  "/:id/status",
  [
    auth,
    check(
      "status",
      "Status must be Planned, In Production, Quality Check, or Completed"
    ).isIn(["Planned", "In Production", "Quality Check", "Completed"]),
  ],
  orderController.updateOrderStatus
);

// Delete Order
router.delete("/:id", auth, orderController.deleteOrder);

// Get All Orders
router.get("/", auth, orderController.getAllOrders);

// Get Orders by Status or Workstation
router.get("/filter", orderController.getFilteredOrders);

module.exports = router;

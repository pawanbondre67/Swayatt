const Order = require('../models/Orders');
const Workstation = require('../models/Workstation'); // Import Workstation model
const Material = require('../models/Material'); // Import Material model
const mongoose = require("mongoose");

// Create Order
exports.createOrder = async (req, res) => {
  const { productName, quantity, priority, materialsUsed, workstationName } = req.body;

  try {
    // Validate required fields
    if (!productName || !quantity || !priority || !materialsUsed || !workstationName) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    // Find workstation by name
    const workstation = await Workstation.findOne({ name: workstationName });
    if (!workstation) {
      return res.status(404).json({ msg: 'Workstation not found' });
    }

    // Validate materials
    const materials = await Promise.all(
      materialsUsed.map(async (material) => {
        const materialDoc = await Material.findOne(material.materialName);
        if (!materialDoc) {
          throw new Error(`Material not found: ${material.materialName}`);
        }
        return { materialId: material.materialName, quantity: material.quantity };
      })
    );

    // Create new order
    const order = new Order({
      productName,
      quantity,
      priority,
      materialsUsed: materials,
      workstationId: workstation._id,
      createdBy: req.user.id
    });

    // Save order to database
    await order.save();
    res.json(order);
  } catch (err) {
    console.error('Error creating order:', err.message);
    res.status(500).send('Server Error');
  }
};

// Update Order Status
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

 const { id } = req.params;
  try {
    // Find order by ID
    
  // Find order by `orderId` instead of `_id`
  let order = await Order.findOne({ orderId: id });

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Update order status
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error('Error updating order status:', err.message);
    res.status(500).send('Server Error' , err.message);
  }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
  console.log('Delete Order Function Called'); // Debugging line
  try {
    // Find order by ID
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Check if the user is a Manager
    if (req.user.role !== 'Manager') {
      return res.status(401).json({ msg: 'Not authorized to delete orders' });
    }

    // Delete order
    await order.remove();
    res.json({ msg: 'Order deleted' });
  } catch (err) {
    console.error('Error deleting order:', err.message);
    res.status(500).send('Server Error');
  }
};

// Get All Orders
exports.getAllOrders = async (req, res) => {
  console.log('Get All Orders Function Called'); // Debugging line
  try {
    // Fetch all orders and populate createdBy and workstationId fields
    const orders = await Order.find()
      .populate('createdBy', 'username')
      .populate('workstationId', 'name');
    res.json(orders);
  } catch (err) {
    console.error('Error fetching all orders:', err.message);
    res.status(500).send('Server Error');
  }
};



// Get Orders by Status or Workstation
exports.getFilteredOrders = async (req, res) => {
  console.log("Get Filtered Orders Function Called"); // Debugging line

  const { status, workstation } = req.query;
  const filter = {};

  try {
    // Apply filters if provided
    if (status) filter.status = status;
    if (workstation) {
      // Convert workstation ID to ObjectId if it's a valid format
      if (mongoose.Types.ObjectId.isValid(workstation)) {
        filter.workstationId = new mongoose.Types.ObjectId(workstation);
      } else {
        return res.status(400).json({ error: "Invalid workstation ID format" });
      }
    }

    // Fetch filtered orders and populate related fields
    const orders = await Order.find(filter)
      .populate("createdBy", "username")
      .populate("workstationId", "name");

    res.json(orders);
  } catch (err) {
    console.error("Error fetching filtered orders:", err.message);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

const Material = require('../models/Material');
const mongoose = require("mongoose");
// Update Material Stock
exports.updateMaterialStock = async (req, res) => {
  const { quantity } = req.body;

  try {
  let  id = new mongoose.Types.ObjectId(req.params.id);
    let material = await Material.findById(id);
    if (!material) return res.status(404).json({ msg: 'Material not found' });

    // Update stock level
    material.currentStock = quantity;
    await material.save();

    res.json(material);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get All Materials
exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get Low Stock Materials
exports.getLowStockMaterials = async (req, res) => {
  try {
    const materials = await Material.find({ currentStock: { $lt: 10 } }); // Example: Low stock is less than 10
    res.json(materials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error' , err.message);
  }
};
const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  currentStock: { type: Number, required: true },
  minimumStockLevel: { type: Number, required: true }
});

module.exports = mongoose.model('Material', materialSchema);
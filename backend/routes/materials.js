const express = require('express');
const { check } = require('express-validator');
const materialController = require('../controllers/materialController');
const auth = require('../middlewares/auth');

const router = express.Router();

// Update Material Stock
router.put('/:id', [
  auth,
  check('quantity', 'Quantity is required and must be a positive number').isInt({ min: 0 })
], materialController.updateMaterialStock);

// Get All Materials
router.get('/', auth, materialController.getAllMaterials);

// Get Low Stock Materials
router.get('/low-stock', auth, materialController.getLowStockMaterials);

module.exports = router;
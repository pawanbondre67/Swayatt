const express = require('express');
const workstationController = require('../controllers/workStationController');
const auth = require('../middlewares/auth');

const router = express.Router();

// Create Workstation
router.post('/create-workstation', auth, workstationController.createWorkstation);

// Get All Workstations
router.get('/', auth, workstationController.getAllWorkstations);

// Get Workstation by ID
router.get('/:id', auth, workstationController.getWorkstationById);

// Update Workstation
router.put('/:id', auth, workstationController.updateWorkstation);

// Delete Workstation
router.delete('/:id', auth, workstationController.deleteWorkstation);

module.exports = router;
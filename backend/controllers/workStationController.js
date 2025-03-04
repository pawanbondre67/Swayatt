const Workstation = require('../models/Workstation');

// Create Workstation
exports.createWorkstation = async (req, res) => {
  const { name, status } = req.body;

  try {
    // Validate required fields
    if (!name) {
      return res.status(400).json({ msg: 'Please provide a workstation name' });
    }

    // Check if workstation already exists
    const existingWorkstation = await Workstation.findOne({ name });
    if (existingWorkstation) {
      return res.status(400).json({ msg: 'Workstation already exists' });
    }

    // Create new workstation
    const workstation = new Workstation({
      name,
      status: status || 'Active' // Default to 'Active' if status is not provided
    });

    // Save workstation to database
    await workstation.save();
    res.json(workstation);
  } catch (err) {
    console.error('Error creating workstation:', err.message);
    res.status(500).send('Server Error');
  }
};

// Get All Workstations
exports.getAllWorkstations = async (req, res) => {
  try {
    // Fetch all workstations
    const workstations = await Workstation.find();
    res.json(workstations);
  } catch (err) {
    console.error('Error fetching workstations:', err.message);
    res.status(500).send('Server Error');
  }
};

// Get Workstation by ID
exports.getWorkstationById = async (req, res) => {
  try {
    // Find workstation by ID
    const workstation = await Workstation.findById(req.params.id);
    if (!workstation) {
      return res.status(404).json({ msg: 'Workstation not found' });
    }
    res.json(workstation);
  } catch (err) {
    console.error('Error fetching workstation:', err.message);
    res.status(500).send('Server Error');
  }
};

// Update Workstation
exports.updateWorkstation = async (req, res) => {
  const { name, status } = req.body;

  try {
    // Find workstation by ID
    let workstation = await Workstation.findById(req.params.id);
    if (!workstation) {
      return res.status(404).json({ msg: 'Workstation not found' });
    }

    // Update workstation fields
    if (name) workstation.name = name;
    if (status) workstation.status = status;

    // Save updated workstation
    await workstation.save();
    res.json(workstation);
  } catch (err) {
    console.error('Error updating workstation:', err.message);
    res.status(500).send('Server Error');
  }
};

// Delete Workstation
exports.deleteWorkstation = async (req, res) => {
  try {
    // Find workstation by ID
    const workstation = await Workstation.findById(req.params.id);
    if (!workstation) {
      return res.status(404).json({ msg: 'Workstation not found' });
    }

    // Delete workstation
    await workstation.remove();
    res.json({ msg: 'Workstation deleted' });
  } catch (err) {
    console.error('Error deleting workstation:', err.message);
    res.status(500).send('Server Error');
  }
};
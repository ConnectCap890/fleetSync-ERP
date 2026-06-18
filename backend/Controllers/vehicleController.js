

const Vehicle = require('../Models/Vehicle');

exports.createVehicle = async (req, res) => {
    const { make, model, year, licensePlate } = req.body;
    try {
        const existingVehicle = await Vehicle.findOne({ licensePlate });
        if (existingVehicle) {
            return res.status(400).json({ message: 'Vehicle with this license plate already exists' });
        }
        const newVehicle = new Vehicle({ make, model, year, licensePlate });
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getVehicleById = async (req, res) => {
    const { id } = req.params;
    try {
        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateVehicle = async (req, res) => {
    const { id } = req.params;
    const { make, model, year, licensePlate, status } = req.body;
    try {
        
        if (licensePlate) {
            const existingVehicle = await Vehicle.findOne({ licensePlate, _id: { $ne: id } });
            if (existingVehicle) {
                return res.status(400).json({ message: 'Vehicle with this license plate already exists' });
            }
        }
        const updates = {};
        const allowedFields = ['make', 'model', 'year', 'licensePlate', 'status'];
        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json(updatedVehicle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteVehicle = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedVehicle = await Vehicle.findByIdAndDelete(id);
        if (!deletedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};
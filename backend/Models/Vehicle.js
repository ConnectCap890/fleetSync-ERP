const mongoose = require( 'mongoose' )

const vehicleSchema = new mongoose.Schema({
  
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['Active', 'In Maintenance', 'Retired','On Trip'],
    default: 'Active'
  }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
const mongoose = require( 'mongoose' )
const driverSchema = new mongoose.Schema({

userID: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
    unique: true },
  name: {   
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  status :  {
    type: String,
    enum:["available","on trip","off duty"],
    default: "available"

  }
});
const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
const mongoose = require( 'mongoose' )
const managerSchema = new mongoose.Schema({

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
  address: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  }

});

const Manager = mongoose.model('Manager', managerSchema);
module.exports = Manager;
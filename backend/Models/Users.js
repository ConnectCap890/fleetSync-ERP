const mongoose = require( 'mongoose' )
const uniqueID = require('../Utils/generateID')
const userSchema = new mongoose.Schema({
 
  uniqueId: {
    type: String,
    default: uniqueID,
    unique: true
  },
  email: {  
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['Admin', 'Driver', 'Manager'],
    required: true
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
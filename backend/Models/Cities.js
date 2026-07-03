const mongoose = require('mongoose');
const citySchema = new mongoose.Schema({

  cityName:{
    type: String,
    required: true,
    unique: true
  },
  cordinates:{
    lat:{type: Number, required: true},
    lng:{type: Number, required: true}
  }

})

const Cities = mongoose.model('City',citySchema);
module.exports =Cities;
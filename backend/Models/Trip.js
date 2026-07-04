const mongoose = require( 'mongoose' );
const tripSchema = new mongoose.Schema( {

    createdBy: {
              type: mongoose.Schema.Types.ObjectId,
              ref : 'User',
              required: true
    },
     departureCity :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true

     },
     arrivalCity :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true

     },
    driver: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Driver', 
        required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Vehicle', 
        required: true },
    startDateTime: {
        type: Date,
        required: true},
    endDateTime: {
        type: Date,
        required: true},    
    status: {
        type: String,
        enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    },
    routeCoordinates:{
        type: [[Number]],
        default: []
        
    },
    distance:{
        type: String
    },
    duration:{
        type:String
    }                 

});
const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;

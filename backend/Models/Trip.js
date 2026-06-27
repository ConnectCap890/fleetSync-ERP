const mongoose = require( 'mongoose' )
const tripSchema = new mongoose.Schema( {

    createdBy: {
              type: mongoose.Schema.Types.ObjectId,
              ref : 'User',
              required: true
    },
    journey: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Journey', 
        required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Driver', 
        required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Vehicle', 
        required: true },
    schedule: {
        type: Date,
        required: true},
    status: {
        type: String,
        enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    }                 

});
const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
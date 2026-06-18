const mongoose = require( 'mongoose' )
const journeySchema = new mongoose.Schema( {
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    estimatedDistance: {
        type: String,
        required: true
    },
    estimatedDuration: {
        type: String,
        required: true
    },
    
    
    description: {
        type: String
    }
} );
const Journey = mongoose.model('Journey', journeySchema);
module.exports = Journey;
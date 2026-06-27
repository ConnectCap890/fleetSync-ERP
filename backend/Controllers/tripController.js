const Trip = require('../Models/Trip');
const Journey = require('../Models/Journey');
const Driver = require('../Models/Driver');
const Vehicle = require('../Models/Vehicle');


exports.createTrip = async (req,res) => {

    const {journey,vehicle,driver,schedule,status} = req.body;
    try{
    
        // checks if the vehicle is available
    const vehicleAvalailbility = await Vehicle.findById(vehicle)
      if (!vehicleAvalailbility) return res.status(404).json({message:"vehicle not found"})
       const existingVehicleTrip = await Trip.findOne({
        vehicle: vehicle,
        status: {$in: ['Scheduled','In Progress']}
    }) 
    if (existingVehicleTrip){
        return res.status(400).json({message:'Vehicle already Scheduled for another Trip!'})
    }
    //checks if the driver is available
    const driverAvailability = await Driver.findById(driver)
    
    if (!driverAvailability)  return res.status(404).json({message: "driver not found"})
    const existDriverTrip = await Trip.findOne({
     driver: driver,
     status: {$in :['Scheduled','In Progress']}
    }) 
    
    if (existDriverTrip) 
        return res.status(400).json({message:'Driver is already Scheduled for another Trip!'})

    const newTrip =  new Trip({

        journey,
        vehicle,
        driver,
        schedule,
        status,
        createdBy: req.user.userId
    });  
    await newTrip.save();
    await Vehicle.findByIdAndUpdate(vehicle,{status:'On Trip'})
    await Driver.findByIdAndUpdate(driver,{status:'on trip'})
    res.status(201).json(newTrip);


    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "server Error"})
    }
};

exports.getTripById = async (req,res) => {
    const {id} = req.params;
    try{
        const trip = await Trip.findById(id)
        .populate('journey','to from')
        .populate('vehicle','make model licensePlate')
        .populate('driver','name')
        .populate('createdBy', 'email userType');
    if(!trip)
        return res.status(404).json({message: "No Trip found"})
       
        res.status(200).json(trip);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "server Error"})
    }
}

exports.getTrip = async (req, res) => {
    try {
        let query = {}

        if(req.user.userType === 'Manager'){
            query.createdBy = req.user.userId
        }
        const trip = await Trip.find()
        .populate('journey','to from')
        .populate('vehicle','licensePlate')
        .populate('driver','name')
        .populate('createdBy','email userType');
       

        res.status(200).json(trip);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateTrip = async (req,res)=>{

     const {id} = req.params;
     const {journey,vehicle,driver,schedule,status} = req.body;
    try{
     //this allows the to only update the fields that are needed  
     const update = {};
     const allowField = ['journey','vehicle','driver','schedule','status'];
     allowField.forEach(fields =>{
        if(req.body[fields] !== undefined)
          update[fields] = req.body[fields]
     }) 
     //check if the userType is Driver then only status can be updated
     if( req.user.userType=== 'Driver'){
     if (Object.keys(update).some(key => key !=='status')) {
        return res.status(403).json({message:"Driver can only update the status"})
     }
    }
    //this updates the status of drivers and Vehicle automatically if the trip is cancelled or completed to available 
     const trip = await Trip.findById(id)
     if(!trip) return res.status(404).json({message: "trip not found"})
     if(status === "In Progress") {
        await Vehicle.findByIdAndUpdate(trip.vehicle,{status: 'On Trip'})
        await Driver.findByIdAndUpdate(trip.driver,{status : 'on trip'})    
        
     }  
     if(status === 'Completed' || status === 'Cancelled')
        {
        await Vehicle.findByIdAndUpdate(trip.vehicle, {status: 'Active'})
        await Driver.findByIdAndUpdate(trip.driver, {status: 'available'})  
        }
     const updateTrip = await Trip.findByIdAndUpdate(id,update,{new: true});
    res.status(200).json(updateTrip);


    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "server Error"})
    }


}

exports.deleteTrip = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTrip = await Trip.findByIdAndDelete(id);
        if (!deletedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};


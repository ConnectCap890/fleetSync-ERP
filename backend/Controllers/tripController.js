const Trip = require('../Models/Trip');
const Driver = require('../Models/Driver');
const Vehicle = require('../Models/Vehicle');



exports.createTrip = async (req,res) => {

    const {departureCity,arrivalCity,vehicle,driver,startDateTime,endDateTime,status,routeCoordinates,distance,duration} = req.body;
    try{
    //check if startDateTime is before endDateTime
    if(new Date(endDateTime) <= new Date(startDateTime)) {
        return res.status(400).json({message: "End date and time must be after start date and time"})
                                                          }  
    if (!departureCity || !arrivalCity) return res.status(400).json({ message: 'Departure city and arrival city are required' });
    if (String(departureCity?._id ?? departureCity) === String(arrivalCity?._id ?? arrivalCity)) return res.status(400).json({ message: 'Departure City must be different from Arrival City' });
        // checks if the vehicle is available
    const vehicleAvalailbility = await Vehicle.findById(vehicle)
      if (!vehicleAvalailbility) return res.status(404).json({message:"vehicle not found"})

       const existingVehicleTrip = await Trip.findOne({
        vehicle: vehicle,
        status: {$in: ['Scheduled','In Progress']},
        $or :[ 
            {startDateTime:{$lt: new Date(endDateTime)}, endDateTime:{ $gt: new Date(startDateTime)}}
        ]
    }) 
    if (existingVehicleTrip){
        return res.status(400).json({message:`Vehicle is busy from ${existingVehicleTrip.startDateTime.toLocaleString()} to ${existingVehicleTrip.endDateTime.toLocaleString()}`})
    }
    //checks if the driver is available
    const driverAvailability = await Driver.findById(driver)
    
    if (!driverAvailability)  return res.status(404).json({message: "driver not found"})
    const existDriverTrip = await Trip.findOne({
     driver: driver,
     status: {$in :['Scheduled','In Progress']},
     $or :[
        {startDateTime:{$lt: new Date(endDateTime)}, endDateTime:{ $gt: new Date(startDateTime)}}
    ]
    }) 
    
    if (existDriverTrip) 
        return res.status(400).json({message:`Driver is busy from ${existDriverTrip.startDateTime.toLocaleString()} to ${existDriverTrip.endDateTime.toLocaleDateString()}`})
    const newTrip =  new Trip({

        departureCity,
        arrivalCity,
        vehicle,
        driver,
        startDateTime,
        endDateTime,
        status,
        routeCoordinates,
        distance,
        duration,
        createdBy: req.user.userId
    });  
    await newTrip.save();
   // await Vehicle.findByIdAndUpdate(vehicle,{status:'On Trip'})
    //await Driver.findByIdAndUpdate(driver,{status:'on trip'})
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
        .populate('departureCity', 'cityName')
        .populate('arrivalCity', 'cityName')
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
        if(req.user.userType === 'Driver'){
            const driverProfile = await Driver.findOne({userID: req.user.userId})
            if(driverProfile){query.driver = driverProfile._id}
        }
        const trip = await Trip.find(query)
        .populate('vehicle','licensePlate')
        .populate('driver','name')
        .populate('departureCity','cityName')
        .populate('arrivalCity', 'cityName')
       

        res.status(200).json(trip);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateTrip = async (req,res)=>{

     const {id} = req.params;
     const {departureCity,arrivalCity,driver,startDateTime,endDateTime,status} = req.body;
    try{
     //this allows the to only update the fields that are needed  
     const update = {};
     const allowField = ['departureCity','arrivalCity','driver','startDateTime','endDateTime','status'];
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
    if (departureCity.toString() === arrivalCity.toString()){
        return res.status(400).json({message:"Departure and Arrival city must be different...use common scense if its not accidental error"})
        alert('Departure and Arrival Cities can not be same!!!')  
    }
    //this updates the status of drivers and Vehicle automatically if the trip is cancelled or complete(d to available 
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

exports.getActiveTripsForMap = async (req, res) => {
  try {
    const trips = await Trip.find({ status: { $in: [ 'In Progress'] } })
      .populate('departureCity', 'cityName cordinates')
      .populate('arrivalCity', 'cityName cordinates')
      .populate('vehicle', 'make model licensePlate')
      .populate('driver', 'name phone')
      .populate('createdBy', 'email userType');

    const formatted = trips.map(trip => ({
            _id: trip._id,
            status: trip.status,
            startDateTime: trip.startDateTime,
            endDateTime: trip.endDateTime,
            routeCoordinates: trip.routeCoordinates,
            distance: trip.distance,
            duration: trip.duration,
            departure: {
                cityName: trip.departureCity?.cityName,
                lat: trip.departureCity?.cordinates?.lat,
                lng: trip.departureCity?.cordinates?.lng
            },
            arrival: {
                cityName: trip.arrivalCity?.cityName,
                lat: trip.arrivalCity?.cordinates?.lat,
                lng: trip.arrivalCity?.cordinates?.lng
            },
            driver: trip.driver,
            vehicle: trip.vehicle,
            createdBy: trip.createdBy
        }))

    res.status(200).json(formatted);
    //console.log(formatted)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


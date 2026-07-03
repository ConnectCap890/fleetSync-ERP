const Cities = require('../Models/Cities');

exports.createCity = async (req,res) => {

    const {cityName,cordinates} =req.body;
    try{
        const existingCity = await Cities.findOne({cityName});
        if(existingCity) return res.status(400).json({message:'City already exists'});
        const newCity = new Cities({
            cityName,
            cordinates
        })
        await newCity.save();
        res.status(201).json(newCity)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.getCities = async(req,res) =>{
         
    try{
        const cities = await Cities.find();
        res.status(200).json(cities)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

}

exports.deleteCity = async (req,res) =>{
        const {id} = req.params;
        try{
            const city = await Cities.findById(id);
            if(!city)return res.status(404).json({message: 'City not found'});
            await city.remove();
            res.status(200).json({message: 'City deleted successfully'})
        }catch(error){
            console.log(error);
            res.status(500).json({message:'server error'})
        }
}
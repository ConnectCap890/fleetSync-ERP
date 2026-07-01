const mongoose = require('mongoose');
const Driver = require('../Models/Driver');
const  User = require('../Models/Users');



exports.createDriver = async (req,res)=>{

    const {uniqueId,name,phone,address,licenseNumber} = req.body;
    try{
        const user = await User.findOne({uniqueId});
        if(!user) return res.status(400).json({message: 'User not found'});
        const driver = new Driver({
            userID : user._id,
            name,
            phone,
            address,
            licenseNumber
        });
        await driver.save();
        res.status(201).json({ message: 'Driver created successfully', driver });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getDriver_List = async (req, res) => {
    try{
        const driver = await Driver.find().populate('userID','uniqueId email userType');
    
        res.status(200).json(driver);
    } catch (error) {   
        res.status(500).json({ message: error.message });
    }
}

exports.getDriverById = async (req, res) => {
    const {id} = req.params;    
    try{
        const driver = await Driver.findById(id);
        if(!driver) return res.status(404).json({message: 'Driver not found'});
        res.status(200).json(driver);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateDriver = async (req, res) => {
    const {id} = req.params;
    const {name,phone,licenseNumber} = req.body;
    try{
        const driver = await Driver.findById(id);
        // Check if driver is the same as the logged in user
        if(!driver) return res.status(404).json({message: 'Driver not found'});
        if (req.user.userType === 'Driver' && req.user.userId.toString() !== driver.userID.toString()) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions to update this driver' });
        }
        driver.name = name;
        driver.phone = phone;
        // Only Admin and Manager can update license number
        if (req.user.userType === 'Admin' || (req.user.userType === 'Manager')) {
            driver.licenseNumber = licenseNumber;
        }
        
        
        await driver.save();
        res.status(200).json({ message: 'Driver updated successfully', driver });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getProfile = async (req,res) =>{

    try{
        const driver = await Driver.findOne({userID: req.user.userId}).populate('userID', 'email uniqueId')
        console.log(driver)
        if(!driver) return res.status(404).json({message:'Profile not found'})
        res.status(200).json(driver)

    }catch(error){
        res.status(500).json({message: error.message})
    }

}

exports.deleteDriver = async (req, res) => {
    const {id} = req.params;    
    try{
        const driver = await Driver.findByIdAndDelete(id);
        if(!driver) return res.status(404).json({message: 'Driver not found'});
        res.status(200).json({message: 'Driver deleted successfully'});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}
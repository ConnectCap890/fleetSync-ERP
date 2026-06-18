const mongoose = require('mongoose');
const Manager = require('../Models/Manager');
const User = require('../Models/Users');

exports.createManager = async (req, res) => {

    const {uniqueId,name,phone,address,department} =req.body;

    try{
        const user = await User.findOne({uniqueId});
        if(!user) return res.status(400).json({message: 'User not found'});

        const manager = new Manager({
            userID : user._id,
            name,
            phone,
            address,
            department
        })
       await manager.save();
       res.status(201).json({message: 'profile created successfully'});     
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Server error'});
    }
}

exports.getManager_List = async (req, res) => {
    try{
        const manager = await Manager.find().populate('userID','email userType');
        res.status(200).json(manager);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Server error'});
    }
}

exports.getManagerById = async (req, res) => {
    const {id} = req.params;
    try{
        const manager = await Manager.findById(id);
        if(!manager) return res.status(404).json({message: 'Manager not found'});
        res.status(200).json(manager);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Server error'});
    }
}

exports.updateManager = async (req, res) => {
    const {id} = req.params;
    const {name,phone,address,department} = req.body;
    try{
        const manager = await Manager.findById(id);
        if(!manager) return res.status(404).json({message: 'Manager not found'});
        manager.name = name;
        manager.phone = phone;
        manager.address = address;
        manager.department = department;
        await manager.save();
        res.status(200).json({message: 'Manager profile updated successfully'});


    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Server error'});
    }
}

exports.deleteManager = async (req, res) => {
    const {id} = req.params;
    try{  
        const manager = await Manager.findByIdAndDelete(id);   
        if(!manager) return res.status(404).json({message: 'Manager not found'});
        res.status(200).json({message: 'Manager profile deleted successfully'});         
    }
    catch(error){   
        console.log(error);
        res.status(500).json({message: 'Server error'});
    }
}

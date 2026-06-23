
const User = require('../Models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) =>{

    const {email,password,userType} = req.body;

    //console.log(req.body);
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            email,
            password: hashedPassword,
            userType
        });
        await newUser.save();
        res.status(201).json({message: 'User registered successfully',
                              uniqueId: newUser.uniqueId   
        });

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Server error'});


    }
}

exports.login = async (req, res) =>{
    const {uniqueId,password} = req.body;
    try{
        const user = await User.findOne({uniqueId});
        if(!user){
            return res.status(400).json({message: 'Invalid credentials'});
        }   
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }   
        const token = jwt.sign({userId: user._id, userType: user.userType}, process.env.JWT_SECRET, {expiresIn: '12h'});
        res.status(200).json({message: 'Login successful', token, userType: user.userType});

    }catch(error){
        res.status(500).json({message: 'Server error'});
    }
}   


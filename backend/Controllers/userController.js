const User = require('../Models/Users');
const bcrypt = require('bcryptjs');



exports.createUser = async (req, res) => {

    const { email, password, userType } = req.body;

    try { 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            userType
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getUserById = async (req, res) => {
    const { id } = req.params;  
    try {
        if(req.user.userType !== 'Admin' && req.user.userId.toString() !== id) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions to view this user' });
        }
        const user = await User.findById(id);   
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }       
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, password, userType } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if(req.user.userType !== 'Admin' && req.user.userId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions to update this user' });
        }
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        if (req.user.userType === 'Admin') {
            user.email = email;
            user.userType = userType;
        }
        
        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

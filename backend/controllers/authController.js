const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

// Register a new user
exports.registerUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Request body is missing or invalid" });
    }

    const { email, password } = req.body;

    if( !email || !password){
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await User.create({ 
            fullName,
            email, 
            password, 
            profileImage: profileImageUrl 
        });
        res.status(201).json({ 
            id: newUser._id,
            newUser,
            token: generateToken(newUser._id)
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error:", error });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    if(!req.body){
        return res.status(400).json({ message: "Request body is missing or invalid" });
    }

    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "Invalid email" });
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({ 
            id: user._id,
            user,
            token: generateToken(user._id)
        });
    }catch(error){
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: "Server error", error: error.message, stack: process.env.NODE_ENV === 'development' ? error.stack : undefined });
    }
};

// Get user info
exports.getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch(error){
        console.error("Error in getUserInfo:", error);
        res.status(500).json({ message: "Server error", error: error.message});
    }
};
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    if(!fullName && !email && !password){
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    try{
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
    } catch (error){
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error:", error });
    }
};

exports.loginUser = async (req, res) => {};

exports.getUserInfo = async (req, res) => {};
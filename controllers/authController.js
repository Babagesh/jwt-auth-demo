import User from '../models/User.js'
import {hashPassword, comparePassword} from '../services/hashService.js'
import {generateToken} from '../services/jwtService.js'

const register = async(req, res) => {
    try{
        const {name, email, password} = req.body
        const existingUser = await User.findOne({email})
        if(existingUser)
        {
            return res.status(400).json({message: "User already exists!"})
        }
        const hashedPassword = await hashPassword(password)
        const user = new User({name, email, password: hashedPassword})
        await user.save()
        return res.status(201).json({message: "User registered successfully!"});
    }
    catch(err)
    {
        res.status(500).json({error: err.message})
    }
};

const login = async(req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({message: "invalid email or password"});
        }
        const isMatch = await comparePassword(password, user.password)
        if(!isMatch)
        {
            return res.status(400).json({message:"invalid email or password"})
        }
        const token = generateToken({id: user._id, email: user.email});
        res.json({message: "Login successful!", token})
    }
    catch(err)
    {
        res.status(500).json({error: err.message})
    }
}   
    
    

const profile = (req, res) => {
    res.json({
        message: "Welcome to your profile!",
        user: req.user
    })
}

export {register, login, profile}
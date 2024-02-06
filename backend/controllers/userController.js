const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// Register a new user
//Route /api/users
//access public
const registerUser = asyncHandler(
   async (req, res) => {
        const {name, email, password} = req.body
       
    
        //validation
        if(!name || !email || !password) {
            res.status(400)
            throw new Error('please include all fields')
        }

        //Find if user already exists
        const userExists = await User.findOne({email})

        if(userExists) {
            res.status(400)
            throw new Error ('User already exists')
        }

        //hash password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creae user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        if(user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new error('Invalid user data')
        }

       
    }
) 

// Login a new user
//Route /api/users/login
//access public
const loginUser = asyncHandler(
    async(req, res) => {
        const {email, password} = req.body
        const user = await User.findOne({email})

        // Check user and password
        if(user && (await bcrypt.compare(password, user.password))) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
            res.message("successfully logged in")
        } else {
            res.status(401)
            throw new Error('Invalid credentials')
        }

        res.send('Login Route')
    }
) 

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


// get current user
//Route /api/users/me
//access private

const getMe = asyncHandler(
    async(req, res) => {
        const user = {
            id: req.user._id,
            email: req.user.email,
            name: req.user.name
        }
         res.status(200).json(user)
    }
)

module.exports = {
    registerUser,
    loginUser,
    getMe,
}
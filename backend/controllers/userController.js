const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
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
            password: hashedPassword
        })

        if(user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password
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
        res.send('Login Route')
    }
) 

module.exports = {
    registerUser,
    loginUser
}
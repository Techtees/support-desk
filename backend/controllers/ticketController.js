const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')



// Get ticket
//Route GET /api/tickets
//access private

const getTickets = asyncHandler(
    async(req, res) => {
        //Get user using the id in the JWT
        const user = await User.findById(req.user.id)
        if(!user) {
            res.status(401)
            throw new Error('user not found')
        }

        const tickets = await Ticket.find({user: req.user.id})
         res.status(200).json(tickets)
    }
)

// Create a new ticket
//Route POST /api/tickets
//access private

const createTickets = asyncHandler(
    async(req, res) => {
        const {product, description} = req.body
        if(!product || !description) {
            res.status(400)
            throw new Error('Please add a product and description')
        }

        //Get user using the id in the JWT
        const user = await User.findById(req.user.id)
        if(!user) {
            res.status(401)
            throw new Error('user not found')
        }

        const tickets = await Ticket.create({
            product,
            description,
            user: req.user.id,
            status: 'new'

        })
        res.status(200).json(tickets)
        res.status(200).json({message:'CreateTicket'})
    }
)


module.exports = {
    getTickets,
    createTickets,
}

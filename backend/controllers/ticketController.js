const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')



// Get ticket
//Route GET /api/tickets
//access private

const getTickets = asyncHandler(
    async(req, res) => {
       
         res.status(200).json({message:'get Ticket'})
    }
)

// Create a new ticket
//Route POST /api/tickets
//access private

const createTickets = asyncHandler(
    async(req, res) => {
       
         res.status(200).json({message:'CreateTicket'})
    }
)


module.exports = {
    getTickets,
    createTickets,
}

const express = require('express')
const router = express.Router()
const { getTickets, getSingleTicket, createTickets } = require('../controllers/ticketController') 

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getTickets).post(protect, createTickets)

router.route('/:id').get(protect, getSingleTicket)

module.exports = router
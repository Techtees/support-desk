const express = require('express')
const router = express.Router()
const { getTickets, getSingleTicket, updateTicket, deleteTicket, createTickets } = require('../controllers/ticketController') 

const {protect} = require('../middleware/authMiddleware')
const noteRouter = require('./noteRoutes')

// Re-route into note router
router.use('/:ticketId/notes', noteRouter)

router.route('/').get(protect, getTickets).post(protect, createTickets)

router.route('/:id')
.get(protect, getSingleTicket)
.delete(protect, deleteTicket)
.put(protect, updateTicket)



module.exports = router
const path = requir('path')
const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const cors = require('cors');
const {errorHandler} = require('./middleware/errorMiddleWare')
const PORT = process.env.PORT || 8000

//Connect to database

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve Frontend
// Set build folder as static
if (process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    // FIX: below code fixes app crashing on refresh in deployment
    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
    })
  } else {
    app.get('/', (_, res) => {
      res.status(200).json({ message: 'Welcome to the Support Desk API' })
    })
  }

  
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server started on port  ${PORT}`))

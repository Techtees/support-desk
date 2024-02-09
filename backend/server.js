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

app.get('/', (req, res) => {
    res.json({message: 'Hello'})
})


app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server started on port  ${PORT}`))

const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const {SERVER_PORT} = process.env
const {seed, createEvent, getEvents, deleteEvent} = require('./controller.js')

app.use(express.json())
app.use(cors())

// DEV
app.post('/seed', seed)

app.post('/newEvent', createEvent)


app.get('/newEvent', getEvents)

app.delete('/newEvent/:id', deleteEvent)

app.listen(SERVER_PORT, () => {
    console.log(`Server running on ${SERVER_PORT}`)
})
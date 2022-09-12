const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const {SERVER_PORT} = process.env
const {seed, createEvent, getToDoList, deleteEvent, addToDoListItem, getToDoListItems, editItem, deleteItem} = require('./controller.js')

app.use(express.json())
app.use(cors())

// DEV
app.post('/seed', seed)

app.post('/newEvent', createEvent)

app.get('/newEvent', getToDoList)

app.delete('/newEvent/:id', deleteEvent)

app.listen(SERVER_PORT, () => {
    console.log(`Server running on ${SERVER_PORT}`)
})

app.post('/newItem', addToDoListItem)

app.get('/newItem', getToDoListItems)

app.put(`/newItem/:id`, editItem)

app.delete('/newItem/:id', deleteItem)
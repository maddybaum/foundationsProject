const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, createEvent} = require('./controller.js')

app.use(express.json())
app.use(cors())

// DEV
app.post('/seed', seed)

app.post('/newEvent', createEvent)
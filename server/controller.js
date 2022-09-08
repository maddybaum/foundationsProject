require('dotenv').config();

const {CONNECTION_STRING} = process.env;

//const { INTEGER } = require("sequelize");
const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    seed: (req, res) => {
        sequelize.query(`create table events (
            event_id serial primary key,
            eventTitle varchar)
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },
    createEvent: (req, res) => {
        const {eventTitle} = req.body

        sequelize.query(`INSERT INTO events (eventTitle)
        VALUES('${eventTitle}') 
        RETURNING *`)
        .then((dbResponse) => {
            res.status(200).send(dbResponse[0])
        })
        .catch((err) => {
            console.log(err);
        })
    },
    getEvents: (req, res) => {
        sequelize.query(`SELECT * FROM events`)
        .then((dbResponse) => {
            res.status(200).send(dbResponse[0])
        })
        .catch((err) => {
            console.log(err);
        })
    },
deleteEvent: (req, res) => {
    const eventid = Number(req.params.id)
    console.log(req.params)
    console.log(`the event is ${eventid}`)
    sequelize.query(`DELETE FROM events WHERE event_id = ${eventid};`)
    .then((dbResponse) => {
        res.status(200).send(dbResponse[0])
    })
    .catch((err) => {
        console.log(err);
    })
}}
require('dotenv').config();

const {CONNECTION_STRING} = process.env;

const { INTEGER } = require("sequelize");
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
            eventTitle varchar
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },
    createEvent: (req, res) => {
        const {title} = req.body

        sequelize.query(`INSERT INTO events (eventTitle)
        VALUES('${title})`)
        .then((dbResponse) => {
            res.status(200).send(dbResponse[0])
        })
        .catch((err) => {
            console.log(err);
        })
    }}
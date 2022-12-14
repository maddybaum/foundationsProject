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
            eventTitle varchar,
            eventDate varchar);
            CREATE TABLE toDoList (
                item_id SERIAL PRIMARY KEY,
                item VARCHAR,
                priority VARCHAR
            );
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },
    createEvent: (req, res) => {
        const { eventTitle, eventDate } = req.body

        sequelize.query(`INSERT INTO events (eventTitle, eventDate)
        VALUES('${eventTitle}', '${eventDate}' ) 
        RETURNING *`)
        .then((dbResponse) => {
            res.status(200).send(dbResponse[0])
        })
        .catch((err) => {
            console.log(err);
        })
    },
    getToDoList: (req, res) => {
        sequelize.query(`SELECT * FROM events`)
        //sequelize.query(`SELECT * FROM todolist`)
        .then((dbResponse) => {
            res.status(200).send(dbResponse[0])
        })
        .catch((err) => {
            console.log(err);
        })
    },
deleteEvent: (req, res) => {
    const eventid = Number(req.params.id)
    console.log(`event id is ${eventid}`)
    console.log(req.params)
    console.log(`the event is ${eventid}`)
    sequelize.query(`DELETE FROM events WHERE event_id = ${eventid};`)
    .then((dbResponse) => {
        res.status(200).send(dbResponse[0])
    })
    .catch((err) => {
        console.log(err);
    })
},
addToDoListItem: (req, res) => {
    const { item, priority } = req.body;

    sequelize.query(`INSERT INTO toDoList (item, priority)
    VALUES ('${item}', '${priority}')
    RETURNING *`)
    .then((dbResponse) => {
        res.status(200).send(dbResponse[0])
    })
    .catch((err) => {
        console.log(err);
    })
},
getToDoListItems: (req, res) => {
    sequelize.query(`SELECT * FROM todolist`)
    .then((dbResponse) => {
        res.status(200).send(dbResponse[0])
    })
    .catch((err) => {
        console.log(err)
    })
},
editItem: (req, res) => {
    let itemid = req.params.id;
    
    const { newitem, newpriority } = req.body;
    console.log('req body is below')
    console.log(req.body)
    //console.log(`${item} ${priority}`)
sequelize.query(`UPDATE todolist 
SET item = '${newitem}', priority = '${newpriority}'
WHERE item_id = '${itemid}'
RETURNING *`)
.then((dbResponse) => {
    res.status(200).send(dbResponse[0])
    console.log(itemid) //id
    console.log(newitem)
})
.catch((err) => {
    console.log(err);
})
   

},
deleteItem: (req, res) => {
    let itemid = Number(req.params.id)
    console.log(`the item id is ${itemid}`)
   
    sequelize.query(`DELETE FROM todolist WHERE item_id = ${itemid};`)
    .then((dbResponse) => {
        res.status(200).send(dbResponse[0])
    })
    .catch((err) => {
        console.log(err);
    })
}}
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const SERVER_PORT = 4000

const controllers = require('./server/controllers');

const app = express();

const { SESSION_SECRET } = process.env;

massive(process.env.CONNECTION_STRING)
    .then(dbInstance => {
        app.set('db', dbInstance);
    })
    .catch(err => console.log(err));

app.use(cors());

app.use(bodyParser.json());

app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
);

app.post('/api/register', controllers.register)

app.post('/api/login', controllers.login)

app.listen(SERVER_PORT, () => {
    console.log(`server listening on port ${SERVER_PORT}`)
})
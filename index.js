require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const controllers = require('./controllers');

const app = express();

let {SERVER_PORT, SESSION_SECRET} = process.env;

massive(proccess.env.CONNECTION_STRING)
    .then(dbInstance => {
        app.set('db', dbInstance);
    })
    .catch(err => console.log(err));

app.use(cors());

app.use(bodyParser.json());

app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitiated: true
    })
);

app.post('api/register', (req, res, next) => {
    const db = req.app.get('db');
    const {username, password} = req.body;

    db.helo_users.findOne({username})
        .then((user) => {
            if(user){
                throw('username exist. please login.')
            }else{
                return bcrypt.hash(password, saltRounds);
            }
        })
        .then((hash) => {
            return db.helo_users.insert({username, password: hash})
        })
        .then((user) => {
            delete user.password;
            req.session.user = user;
            res.send('registered')
        })
        .catch((err) => {
            res.send(err)
        })
})

app.post('api/login', (req, res) => {
    const db = req.app.get('db');
    const {username, password} = req.body;
    let currentUser;

    db.helo_users.findone({username})
        .then((user) => {
            if(!user){
                throw('user not found. please register.')
            }else{
                currentUser = user;
                return bcrypt.compare(password, user.password)
            }
        })
        .then((correctPassword) => {
            if(correctPassword){
                delete currentUser.password;
                req.session.user = currentUser;
                res.send('logged in')
            }else{
                throw('username or password incorrect')
            }
        })
        .catch((errr) => {
            res.send(err)
        })
})

app.listen(SERVER_PORT, () => {
    console.log('server listening on port ${SERVER_PORT}')
})
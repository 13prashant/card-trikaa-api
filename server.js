const express = require('express');
const cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcrypt');
require('dotenv').config();

const login = require('./controllers/login')
const register = require('./controllers/register')
const profile = require('./controllers/profile');

const app = express();

app.use(express.json())
app.use(cors())

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const db = 
    process.env.NODE_ENVIRONMENT === 'development' ? 
    knex({
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'postgres',
            password: 'prashant',
            database: 'cardtrikaa'
        }
    }) : 
    knex({
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: true
        }
            // ssl: {
            //     rejectUnauthorized: false
            // }
    });

app.get('/', (req, res) => {
    res.json('it is working!')
})

app.post('/login', (req, res) => login.handleLogIn(req, res, db, bcrypt))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))
app.put('/:id', (req, res) => profile.handleUpdate(req, res, db))
app.get('/:user', (req, res) => profile.handleUsername(req, res, db))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.`)
})


// CREATE TABLE users(
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(50) UNIQUE,
//     mobileNumber TEXT UNIQUE,
//     whatsappNumber TEXT,
//     email TEXT UNIQUE,
//     firstName VARCHAR(20),
//     lastName VARCHAR(20),
//     image VARCHAR,
//     companyName VARCHAR(50),
//     designation VARCHAR(50),
//     role VARCHAR(200),
//     instagramHandle VARCHAR(100),
//     facebookHandle VARCHAR(100),
//     twitterHandle VARCHAR(100),
//     linkedinHandle VARCHAR(100),
//     website VARCHAR(50),
//     address VARCHAR(200),
//     joined TIMESTAMP NOT NULL);

// CREATE TABLE login(
//     id SERIAL PRIMARY KEY,
//     mobileNumber TEXT UNIQUE,
//     username VARCHAR(50) UNIQUE,
//     email TEXT UNIQUE,
//     hash VARCHAR(100) NOT NULL
// );
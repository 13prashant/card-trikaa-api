const express = require('express');
const cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcrypt');

const login = require('./controllers/login')
const register = require('./controllers/register')
const profile = require('./controllers/profile');

const app = express();

app.use(express.json())
app.use(cors())

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
    },
    ssl: {
        rejectUnauthorized: false
    }
});


app.get('/', (req, res) => {
    res.send('it is working!')
})

app.post('/login', (req, res) => login.handleLogIn(req, res, db, bcrypt))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))
app.put('/:id', (req, res) => profile.handleUpdate(req, res, db))
app.get('/:user', (req, res) => profile.handleUsername(req, res, db))

const PORT = process.env.PORT

app.listen(PORT || 5000, () => {
    console.log(`server is running on port ${PORT}.`)
})





// CREATE TABLE users (
//       id SERIAL PRIMARY KEY,
//       username VARCHAR(50) UNIQUE,
//       mobileNumber BIGINT UNIQUE,
//       email text UNIQUE,
//       firstName VARCHAR(20),
//       lastName VARCHAR(20),
//       image VARCHAR,
//       companyName VARCHAR(50),
//       designation VARCHAR(50),
//       role VARCHAR(200),
//       instagramHandle VARCHAR(100),
//       facebookHandle VARCHAR(100),
//       twitterHandle VARCHAR(100),
//       linkedinHandle VARCHAR(100),
//       website VARCHAR(50),
//       address VARCHAR(200),
//       joined TIMESTAMP NOT NULL );

// CREATE TABLE login (
//     id SERIAL PRIMARY KEY,
//     mobileNumber BIGINT UNIQUE,
//     username VARCHAR(50) UNIQUE,
//     email text UNIQUE,
//     hash VARCHAR(100) NOT NULL
// );
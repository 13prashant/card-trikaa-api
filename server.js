const express = require('express');

const signin = require('./controllers/signin')
const register = require('./controllers/register')
const profile = require('./controllers/profile')

const app = express();

app.use(express.json())

const database = {
    users: [
        {
            id: '123',
            username: 'prashant',
            firstName: 'Prashant',
            lastName: 'Patel',
            image: null,
            mobileNumber: '8000432174',
            whatsappNumber: '',
            companyName: 'prashaant.in',
            designation: 'web-dev',
            role: 'working as a full-stack developer',
            instagramHandle: '13.prashant',
            facebookHandle: 'pacific1392',
            twitterHandle: '13prashaant',
            linkedinHandle: 'pacific1392',
            website: 'www.prashaant.in',
            email: 'prashant@gmail.com',
            address: 'Brahman Street, Bhimrad, Surat',
            password: 'prashant',
            joined: new Date()
        },
        {
            id: '124',
            username: 'dhyaan',
            firstName: 'Dhyaan',
            lastName: 'Patel',
            image: null,
            mobileNumber: '8000432174',
            whatsappNumber: '',
            companyName: 'dhyaan.in',
            designation: 'front-end-dev',
            role: 'working as a front-end developer',
            instagramHandle: '13.dhyaan',
            facebookHandle: 'dhyaan',
            twitterHandle: 'dhyaan',
            linkedinHandle: 'dhyaan',
            website: 'www.dhyaan.in',
            email: 'dhyaan@gmail.com',
            address: 'Brahman Street, Bhimrad, Surat',
            password: 'dhyaan',
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => signin.handleSignIn(req, res, database))
app.post('/register', (req, res) => register.handleRegister(req, res, database))
app.get('/profile/:username', (req, res) => profile.handleUsername(req, res, database))
// app.put('/profile/:id', (req, res) => profile.handleUserid(req, res, database))

app.listen(5000, () => {
    console.log('server is running on port 5000.')
})
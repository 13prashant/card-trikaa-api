
const handleLogIn = (req, res, db, bcrypt) => {
    const { mobileNumber, username, email, password } = req.body

    // if (!mobileNumber || !username || !email || !password) {
    //     return res.status(400).json('Cannot login!')
    // }

    db.select('mobilenumber', 'username', 'email', 'hash').from('login')
        .where('mobilenumber', '=', mobileNumber)
        .then(data => bcrypt.compareSync(password, data[0].hash) ?
            db.select('*').from('users')
                .where('mobilenumber', '=', mobileNumber)
                .then(user => res.json(user[0]))
                .catch(error => res.status(400).json('unable to get user!'))
            : res.status(400).json('wrong credentials!')
        )
        .catch(error => res.status(400).json('wrong credentials!'))
}

module.exports = {
    handleLogIn
}
const saltRounds = 10;

const handleRegister = (req, res, db, bcrypt) => {
    const { mobileNumber, email, firstName, lastName, username, password } = req.body

    // if (!mobileNumber || !email || !firstName || !lastName || !username || !password) {
    //     return res.status(400).json('cannot register!')
    // }

    const hash = bcrypt.hashSync(password, saltRounds);

    db.transaction(trx => {
        trx.insert({
            mobilenumber: mobileNumber,
            username: username,
            hash: hash
        })
            .into('login')
            .returning(['mobilenumber', 'username'])
            .then(loginUser => {
                trx('users')
                    .returning('*')
                    .insert({
                        username: loginUser[0].username,
                        firstname: firstName,
                        lastname: lastName,
                        mobilenumber: loginUser[0].mobilenumber,
                        joined: new Date()
                    })
                    .then(user => {
                        if (user.mobilenumber === mobileNumber) {
                            res.status(400).json('This mobile number is already registered!')
                        } else if (user.username === username) {
                            res.status(400).json('This username is not available!')
                        }
                        res.json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback);
    })
        .catch(error => res.status(400).json('unable to register!'))
}

module.exports = {
    handleRegister
}
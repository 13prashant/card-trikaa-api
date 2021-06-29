const saltRounds = 10;

const handleRegister = (req, res, db, bcrypt) => {
    const { mobileNumber, email, firstName, lastName, username, password } = req.body

    // if (!mobileNumber || !email || !firstName || !lastName || !username || !password) {
    //     return res.status(400).json('cannot register!')
    // }
    const hash = bcrypt.hashSync(password, saltRounds);

    db.select('*').from('login')
        .where('mobilenumber', '=', mobileNumber)
        .then(data => {
            if (data.length) {
                return res.status(400).json('This mobile number is already registered!')
            }
        })

    db.select('*').from('login')
        .where('username', '=', username)
        .then(data => {
            if (data.length) {
                return res.status(400).json('This username is not available!')
            }
        })

    db.transaction(async (trx) => {
        try {
            await Promise.all([
                trx('login').insert({
                    mobilenumber: mobileNumber,
                    username: username,
                    hash: hash
                }),
                trx('users').insert({
                    username: username,
                    firstname: firstName,
                    lastname: lastName,
                    mobilenumber: mobileNumber,
                    joined: new Date()
                }),
            ]).then(xyz => {
                res.json('success')
            })
        } catch (error) {
            return res.status(400).json('unable to register!')
        }
    });
}

module.exports = {
    handleRegister
}
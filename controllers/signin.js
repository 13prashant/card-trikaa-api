
const handleSignIn = (req, res, database) => {
    const { email, password } = req.body
    if (email === database.users[0].email
        && password === database.users[0].password) {
        res.json('successfully signed in')
    } else {
        res.status(400).json('error signing in')
    }
}

module.exports = {
    handleSignIn
}
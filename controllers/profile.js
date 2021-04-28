const handleUsername = (req, res, database) => {
    const { username } = req.params
    let found = false;
    database.users.forEach(user => {
        if (user.username === username) {
            found = true;
            return res.json(user)
        }
    })
    if (!found) {
        res.status(400).json('could not find such user!')
    }
}

// const handleUserid = (req, res, database) => {

// }

module.exports = {
    handleUsername,
    // handleUserid
}
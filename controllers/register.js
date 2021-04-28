const handleRegister = (req, res, database) => {
    const { firstName, lastName, email, username, password } = req.body
    database.users.push({
        id: '123',
        username: username,
        firstName: firstName,
        lastName: lastName,
        image: null,
        mobileNumber: '',
        whatsappNumber: '',
        companyName: '',
        designation: '',
        role: '',
        instagramHandle: '',
        facebookHandle: '',
        twitterHandle: '',
        linkedinHandle: '',
        website: '',
        email: email,
        address: '',
        password: password,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
}

module.exports = {
    handleRegister
}
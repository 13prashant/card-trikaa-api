const handleUsername = (req, res, db) => {
    const { user } = req.params
    console.log(req.params)
    db.select('*').from('users').where({ username: user })
        .then(user => {
            console.log(user)
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('no such user found!')
            }
        })
        .catch(error => res.status(400).json('error getting user!'))
}

const e = require("express");


const handleUpdate = (req, res, db) => {
    const {
        id,
        userName,
        firstName,
        lastName,
        mobileNumber,
        whatsappNumber,
        companyName,
        designation,
        role,
        instagramHandle,
        facebookHandle,
        twitterHandle,
        linkedinHandle,
        website,
        email,
        address
    } = req.body

    db.transaction(trx => {
        trx('login')
            .where('id', '=', id)
            .update({
                username: userName,
                mobilenumber: mobileNumber,
                email: email,
            })
            .returning(['username', 'mobilenumber', 'email'])
            .then(loginUser => {
                trx('users')
                    .where('id', '=', id)
                    .update({
                        username: loginUser[0].username,
                        firstname: firstName,
                        lastname: lastName,
                        mobilenumber: loginUser[0].mobilenumber,
                        whatsappnumber: whatsappNumber,
                        companyname: companyName,
                        designation: designation,
                        role: role,
                        instagramhandle: instagramHandle,
                        facebookhandle: facebookHandle,
                        twitterhandle: twitterHandle,
                        linkedinhandle: linkedinHandle,
                        website: website,
                        email: loginUser[0].email,
                        address: address
                    })
                    .returning('*')
                    .then(user => {
                        console.log(user)
                        res.json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(error => console.log(error))
}

module.exports = {
    handleUsername,
    handleUpdate
}





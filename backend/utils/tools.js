const bcrypt = require('bcryptjs')

exports.hash = (myPlaintextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(myPlaintextPassword, 10, function(err, hash) {
            // Store hash in your password DB.
            if (err) {
                reject(err)
            }
            resolve(hash)
        })
    })
}

exports.compare = (myPlaintextPassword, hash) => {
    return new Promise((res, rej) => {
        bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
            if (err) {
                rej(err)
            }
            res(result)
        });
    })
}
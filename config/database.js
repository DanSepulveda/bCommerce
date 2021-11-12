const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.SECRET,
    password: process.env.SECRET,
    database: process.env.SECRET
})

db.connect(err => {
    if (err) {
        console.log(err)
        return
    }
    console.log("Database connected")
})

module.exports = db
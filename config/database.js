const mysql = require('mysql')
const { promisify } = require('util')

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.SECRET,
    password: process.env.SECRET,
    database: process.env.SECRET
})

pool.getConnection((err, connection) => {
    if (err) {
        console.log(err)
        return
    }
    if (connection) connection.release()
    console.log("Database connected")
})

pool.query = promisify(pool.query)

module.exports = pool
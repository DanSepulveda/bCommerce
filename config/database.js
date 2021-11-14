const mysql = require('mysql')
const { promisify } = require('util')

const pool = mysql.createPool({
    host: process.env.HOSTDB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
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
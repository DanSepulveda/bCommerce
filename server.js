const express = require('express')
require('dotenv').config()
require('./config/database')
const router = require('./routes/index')

const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use('/', router)

app.listen(process.env.PORT || 4000, () => console.log('Server listening on port 4000'))


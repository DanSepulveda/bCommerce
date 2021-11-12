const express = require('express')
require('dotenv').config()
require('./config/database')
// const router = require('./routes/index')
// const fileUpload = require('express-fileupload')
const productControllers = require('./controllers/productControllers')

const app = express()


app.use(express.static('public'))
app.set('view engine', 'ejs')
// app.use(express.urlencoded({ extended: true }))

// app.use(express.json())

app.get('/', productControllers.readProducts)

app.listen(4000, () => console.log('Server listening on port 4000'))


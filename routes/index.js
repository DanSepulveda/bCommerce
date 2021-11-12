const express = require('express')
const productControllers = require('../controllers/productControllers')

const router = express.Router()

router.route('/')
    .get(productControllers.showHome)

router.route('/category/:id')
    .get(productControllers.productsPerCategory)

module.exports = router

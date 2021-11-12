const express = require('express')
const productControllers = require('../controllers/productControllers')

const router = express.Router()

router.route('/')
    .get(productControllers.showHome)

router.route('/category/:id')
    .get(productControllers.productsPerCategory)

router.route('/search-products')
    .get(productControllers.searchProducts)

module.exports = router

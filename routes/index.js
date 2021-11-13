const express = require('express')
const productControllers = require('../controllers/productControllers')

const router = express.Router()

router.route('/')
    .get(productControllers.showHome)

router.route('/category/:id')
    .get(productControllers.productsPerCategory)

router.route('/search-products')
    .get(productControllers.searchProducts)

router.route('/error')
    .get((req, res) => {
        res.render('error')
    })

router.route('/not-found')
    .get((req, res) => {
        res.render('not-found')
    })

router.route('/:anything')
    .get((req, res) => {
        res.redirect('/not-found')
    })

module.exports = router

const pool = require('../config/database')
const getCategories = require('./categoryControllers').getCategories

const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
});

const productControllers = {
    showHome: async (req, res) => {
        try {
            let categories = await getCategories()
            res.render('index', {
                title: 'beCommerce - Inicio',
                categories,
                products: []
            })
        } catch (error) {
            res.redirect('/escritorio')
        }

    },
    readProduct: (req, res) => {
        res.render('index', {
            title: 'beCommerce - cerveza',
        })
    },
    productsPerCategory: async (req, res) => {
        try {
            let products = await pool.query(`SELECT * from product WHERE category = ${req.params.id}`)
            products.map(product => {
                product.finalPrice = formatter.format(product.price * (100 - product.discount) / 100),
                    product.price = formatter.format(product.price)
            })
            let category = await pool.query(`SELECT name from category WHERE id = ${req.params.id}`)
            category = category[0].name

            let categories = await getCategories()

            res.render('category', {
                title: `bCommerce - ${category[0].toUpperCase() + category.slice(1)}`,
                products,
                category,
                categories
            })
        } catch (error) {
            res.redirect('/')
        }
    }
}

module.exports = productControllers
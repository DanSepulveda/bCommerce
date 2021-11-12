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
                products: [],
                category: '',
                categories,
                searching: false
            })
        } catch (error) {
            res.redirect('/escritorio')
        }

    },
    productsPerCategory: async (req, res) => {
        try {
            let products = await pool.query(`SELECT * FROM product WHERE category = ${req.params.id}`)
            products.map(product => {
                product.finalPrice = formatter.format(product.price * (100 - product.discount) / 100),
                    product.price = formatter.format(product.price)
            })
            let category = await pool.query(`SELECT name FROM category WHERE id = ${req.params.id}`)
            category = category[0].name

            // this function gets all catefories to show links in navbar
            let categories = await getCategories()

            res.render('category', {
                title: `bCommerce - ${category[0].toUpperCase() + category.slice(1)}`,
                products,
                category,
                categories,
                searching: false
            })
        } catch (error) {
            res.redirect('/')
        }
    },
    searchProducts: async (req, res) => {
        try {
            let searchedProducts = await pool.query(`SELECT * FROM product WHERE name LIKE '%${req.query.search}%'`)
            let categories = await getCategories()
            res.render('category', {
                title: `bCommerce - resultados para ${req.body.search}`,
                products: searchedProducts,
                category: '',
                categories,
                searching: true
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = productControllers
const pool = require('../config/database')
const getCategories = require('./categoryControllers').getCategories

const addFinalPrice = (products) => {
    products.map(product => {
        product.finalPrice = product.price * (100 - product.discount) / 100
    })
    return products
}

const productControllers = {
    showHome: async (req, res) => {
        try {
            // this function gets all catefories to show links in navbar
            let categories = await getCategories()

            let products = await pool.query('SELECT * FROM product WHERE discount > 0')
            products = addFinalPrice(products)

            let selectedCategories = []
            products.forEach(product => {
                if (!selectedCategories.includes(product.category)) {
                    selectedCategories.push(product.category)
                }
            })

            res.render('index', {
                title: 'beCommerce - Inicio',
                products,
                category: '',
                categories,
                searching: false,
                selectedCategories
            })
        } catch (error) {
            res.redirect('/error')
        }
    },
    productsPerCategory: async (req, res) => {
        try {
            // this function gets all catefories to show links in navbar
            let categories = await getCategories()

            let products = await pool.query(`SELECT * FROM product WHERE category = ${req.params.id}`)
            products = addFinalPrice(products)

            let category = await pool.query(`SELECT name FROM category WHERE id = ${req.params.id}`)
            category = category[0].name

            res.render('category', {
                title: `bCommerce - ${category[0].toUpperCase() + category.slice(1)}`,
                products,
                category,
                categories,
                searching: false
            })
        } catch (error) {
            res.redirect('/error')
        }
    },
    searchProducts: async (req, res) => {
        try {
            // this function gets all catefories to show links in navbar
            let categories = await getCategories()

            let searchedProducts = await pool.query(
                `SELECT product.id, product.name, product.url_image, product.price, product.discount, category.name AS category FROM product INNER JOIN category ON product.category=category.id WHERE product.name LIKE '%${req.query.search}%'`)

            searchedProducts = addFinalPrice(searchedProducts)

            res.render('category', {
                title: `bCommerce - Resultados para ${req.query.search}`,
                products: searchedProducts,
                category: '',
                categories,
                searching: true,
                searched: req.query.search
            })
        } catch (error) {
            res.redirect('/error')
        }
    }
}

module.exports = productControllers
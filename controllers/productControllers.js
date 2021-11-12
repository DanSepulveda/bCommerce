const db = require('../config/database')
const getCategories = require('./categoryControllers').getCategories

const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
});

const productControllers = {
    showHome: async (req, res) => {
        try {
            db.query('SELECT * from category', function (error, results) {
                if (error) throw error;
                res.render('index', {
                    title: 'beCommerce - cerveza',
                    categories: results
                })
            });

        } catch (error) {
            res.redirect('/escritorio')
        }

    },
    readProduct: (req, res) => {
        console.log('hola')
        res.render('index', {
            title: 'beCommerce - cerveza',
        })
    },
    productsPerCategory: (req, res) => {
        try {
            db.query(`SELECT * from product WHERE category = ${req.params.id}`, function (error, results) {
                if (error) throw error;
                results.map(product => {
                    product.finalPrice = formatter.format(product.price * (100 - product.discount) / 100),
                        product.price = formatter.format(product.price)
                })
                db.query(`SELECT name from category WHERE id = ${req.params.id}`, function (error, category) {
                    if (error) throw error;
                    res.render('category', {
                        title: 'beCommerce - cerveza',
                        category: category[0].name,
                        products: results,
                        categories: category
                    })
                })



            });
        } catch (error) {

        }
    }
}

module.exports = productControllers
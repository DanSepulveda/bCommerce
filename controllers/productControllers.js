const db = require('../config/database')

const productControllers = {
    readProducts: async (req, res) => {
        try {
            db.query('SELECT * from category', function (error, results, fields) {
                if (error) throw error;
                res.render('index', {
                    title: 'beCommerce - cerveza',
                    categories: results
                    // heading: 'Productos',
                    // editMode: false,
                    // error: null,
                    // user: req.session.username,
                    // image: req.session.image,
                    // rol: req.session.rol,
                    // allProducts
                })
            });

        } catch (error) {
            res.redirect('/escritorio')
        }

    },
    readProduct: (req, res) => {
        res.render('index')
    },
}

module.exports = productControllers
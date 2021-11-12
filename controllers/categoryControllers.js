const pool = require('../config/database')

const categoryControllers = {
    getCategories: async (req, res) => {
        try {
            let categories = await pool.query('SELECT * from category')
            return categories
        } catch (error) {
            res.redirect('/')
        }
    },
}

module.exports = categoryControllers
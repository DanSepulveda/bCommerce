const db = require('../config/database')

const categoryControllers = {
    getCategories: async (req, res) => {

        try {
            // await new Promise db.query('SELECT * from category', function (error, results, fields) {
            //     if (error) throw error;
            //     return results
            // });



        } catch (error) {
            res.redirect('/')
        }

    },
}

module.exports = categoryControllers
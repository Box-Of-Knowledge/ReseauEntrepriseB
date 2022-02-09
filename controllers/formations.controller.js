const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const pool = require('../db/db')

const formationsCtrl = {
    allFormations : async(req,res) =>{
        try {
            const allFormations = await pool.query('SELECT * FROM formation');
            res.json(allFormations.rows);
        }
        catch (err) {
            console.error(err.message);
        }
    }
}

module.exports = formationsCtrl;
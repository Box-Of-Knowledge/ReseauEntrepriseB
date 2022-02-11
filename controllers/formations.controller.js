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
    },
    userFormations : async(req, res) => {
        try {
            const { id } = req.params;
            const userFormations = await pool.query('SELECT * FROM formation_student WHERE stud_id = $1', [id])
            res.json(userFormations.rows)
        }
        catch (err) {
            console.error(err.message);
        }
    },
}

module.exports = formationsCtrl;
const jwt = require('jsonwebtoken');
const pool = require('../db/db')

const comment = {
    create : async(req, res) => {
        try {
           const { id } = req.params;
           const { description, formation_id } = req.body;
           console.log(description, id, formation_id);
           await pool.query('INSERT INTO commentary (description, stud_id, form_id) VALUES($1, $2, $3)', [description, id, formation_id]);
           res.json('comment has been published !')
        }
        catch (err) {
           console.error(err.message);
        }
    },

    modify : async(req, res) => {
        try {
           const { id } = req.params;
           const { description, comment_id } = req.body;
           await pool.query('UPDATE commentary SET description = $1 WHERE comment_id = $2', [description, comment_id]);
           res.json('Comment has been updated')
        }
        catch (err) {
           console.error(err.message);
        }
    },

   delete : async(req, res) => {
        try {
        const { comment_id } = req.body;
        await pool.query('DELETE FROM commentary  WHERE comment_id = $1', [comment_id]);
        res.json('Comment has been deleted !')
        }
        catch (err) {
        console.error(err.message);
        }
    },
}

module.exports = comment;
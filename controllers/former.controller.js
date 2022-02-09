const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const pool = require('../db/db')

const formerCtrl = {
    register : async(req,res,next) =>{
        try{
            const {name, password} = req.body;
            if(password.length <6) return res.status(400).json({msg : "Password must be at least 6 caracters"}) 

            //Mot de passe
            const passwordHash = await argon2.hash(password, {type: argon2.argon2id})
            const newUser = await pool.query('INSERT INTO former (name, password) VALUES($1, $2)', [name, passwordHash]);

            //Token d'identification
            const accessToken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})
            
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // Equivalent à 7 jours
            })

            res.json({accessToken})
            // res.json({msg: "Register Success! "})

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    infos : async(req, res) => {
        try {
            const { id } = req.params;
            const userId = await pool.query('SELECT * FROM former WHERE former_id = $1', [id])
            res.json(userId.rows[0])
        }
        catch (err) {
            console.error(err.message);
        }
    },

    modify : async(req, res) => {
        try {
           const { id } = req.params;
           const { name } = req.body;
           await pool.query('UPDATE former SET name = $1 WHERE former_id = $2', [name, id]);
           res.json('Former has been updated')
        }
        catch (err) {
           console.error(err.message);
        }
    },

    changePassword : async(req, res) => {
        try {
           const { id } = req.params;
           const { password } = req.body;
           await pool.query('UPDATE former SET password = $1 WHERE former_id = $2', [password, id]);
           res.json('Password has been updated')
        }
        catch (err) {
           console.error(err.message);
        }
    },

   delete : async(req, res) => {
        try {
        const { id } = req.params;
        await pool.query('DELETE FROM former WHERE former_id = $1', [id]);
        res.json('Former has been deleted !')
        }
        catch (err) {
        console.error(err.message);
        }
    },

    createFormation : async(req,res,next) =>{
        try{
            const { id } = req.params;
            const {title, cursus} = req.body;
            console.log(title, cursus, id);

            const newFormation = await pool.query('INSERT INTO formation (title, cursus, form_form_id) VALUES($1, $2, $3)', [title, cursus, id]);

            //Token d'identification
            const accessToken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})
            
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // Equivalent à 7 jours
            })

            res.json({accessToken})
            // res.json({msg: "Register Success! "})

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    infosFormation : async(req, res) => {
        try {
            const { id } = req.params;
            const userId = await pool.query('SELECT * FROM formation WHERE former_id = $1', [id])
            res.json(userId.rows[0])
        }
        catch (err) {
            console.error(err.message);
        }
    },

    modifyFormation : async(req, res) => {
        try {
           const { id } = req.params;
           const { name } = req.body;
           await pool.query('UPDATE former SET name = $1 WHERE former_id = $2', [name, id]);
           res.json('Former has been updated')
        }
        catch (err) {
           console.error(err.message);
        }
    },

   deleteFormation : async(req, res) => {
        try {
        const { id } = req.params;
        await pool.query('DELETE FROM former WHERE former_id = $1', [id]);
        res.json('Former has been deleted !')
        }
        catch (err) {
        console.error(err.message);
        }
    },
}

module.exports = formerCtrl;
const argon2 = require('argon2');
//const jwt = require('jsonwebtoken');
const pool = require('../db/db');
const jwtTokens = require('../utils/jwt-helpers');

const userCtrl = {
    register : async(req,res,next) =>{
        try{
            const {name, password} = req.body;
            if(password.length <6) return res.status(400).json({msg : "Password must be at least 6 caracters"}) 

            //Mot de passe
            const passwordHash = await argon2.hash(password)
            await pool.query('INSERT INTO student (name, password) VALUES($1, $2)', [name, passwordHash]);

            res.status(200).json({msg: "Utilisateur créé"})

        } catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    login : async(req, res) => {
        try {
            const { name, password } = req.body;
            const student = await pool.query('SELECT * FROM student WHERE name = $1', [name])
            if(student.rows.length === 0) return res.status(401).json({error: "ce nom n'existe pas."})
            //console.log(password,student.rows[0].password)
            const passwordHash = student.rows[0].password.trim();
            console.log(passwordHash)
            //verif mdp
            const validPassword = await argon2.verify(passwordHash, password)
            if (!validPassword) return res.status(401).json({error: "Incorrect password"});

            let tokens = jwtTokens(student.rows[0]) //créé tokens
            res.cookie('refresh_token', tokens.refreshToken, {
                httpOnly: true,
                sameSite: 'none', 
                secure: true}
            );
            res.json({secure:tokens, student_id:student.rows[0].student_id});
        }
        catch (err) {
            console.error(err.message);
            res.status(401).json({error: "Une erreur est survenue."})
        }
    },

    infos : async(req, res) => {
        try {
            const { id } = req.params;
            const userId = await pool.query('SELECT * FROM student WHERE student_id = $1', [id])
            res.json(userId.rows[0])
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    modify : async(req, res) => {
        try {
           const { id } = req.params;
           const { name } = req.body;
           await pool.query('UPDATE student SET name = $1 WHERE student_id = $2', [name, id]);
           res.json('User was updated')
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    changePassword : async(req, res) => {
        try {
           const { id } = req.params;
           const { password } = req.body;
           const passwordHash = await argon2.hash(password)
           await pool.query('UPDATE student SET password = $1 WHERE former_id = $2', [passwordHash, id]);
           res.json('Password has been updated')
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
   delete : async(req, res) => {
        try {
        const { id } = req.params;
        await pool.query('DELETE FROM student  WHERE student_id = $1', [id]);
        res.json('User was deleted !')
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    refresh : async(req, res) => {
        try {
            const refreshToken = req.cookies.refresh_token;
            console.log(refreshToken);
        } catch(error){
            return res.status(500).json({msg: err.message})
        }
    },
    
    deleteToken : async(req, res) => {
        try {
          res.clearCookie('refresh_token');
          return res.status(200).json({message:'Refresh token deleted.'});
        } catch (error) {
          res.status(401).json({error: error.message});
        }
    }
}

module.exports = userCtrl;
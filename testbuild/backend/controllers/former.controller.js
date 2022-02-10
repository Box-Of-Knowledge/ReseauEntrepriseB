const argon2 = require('argon2');
//const jwt = require('jsonwebtoken');
const pool = require('../db/db');
const jwtTokens = require('../utils/jwt-helpers');


const formerCtrl = {
    register : async(req,res,next) =>{
        try{
            const {name, password} = req.body;
            if(password.length <6) return res.status(400).json({msg : "Password must be at least 6 caracters"}) 

            //Mot de passe
            const passwordHash = await argon2.hash(password, {type: argon2.argon2id})
            const newUser = await pool.query('INSERT INTO former (name, password) VALUES($1, $2)', [name, passwordHash]);
            
            res.status(200).json({msg:'compte créé avec succès'})
        } catch(err){
            return res.status(500).json({msg: "impossible de créer l'utiisateur (veuillez essayer avec un autre nom)"})
        }
    },

    login : async(req, res) => {
        try {
            const { name, password } = req.body;
            const former = await pool.query('SELECT * FROM former WHERE name = $1', [name])
            if(former.rows.length === 0) return res.status(401).json({error: "ce nom n'existe pas."})
            //console.log(password,student.rows[0].password)
            const passwordHash = former.rows[0].password.trim();
            //verif mdp
            const validPassword = await argon2.verify(passwordHash, password)
            if (!validPassword) return res.status(401).json({error: "Incorrect password"});

            let tokens = jwtTokens(former.rows[0]) //créé tokens
            res.cookie('refresh_token', tokens.refreshToken, {
                httpOnly: true,
                sameSite: 'none', 
                secure: true}
            );
            res.json(tokens);
        }
        catch (err) {
            console.error(err.message);
            res.status(401).json({error: "Une erreur est survenue."})
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

    refresh : async(req, res) => {
        try {
            const refreshToken = req.cookies.refresh_token;
            console.log(req.cookies);
            if (refreshToken === null) return res.sendStatus(401);
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
              if (error) return res.status(403).json({error:error.message});
              let tokens = jwtTokens(user);
              res.cookie('refresh_token', tokens.refreshToken, {httpOnly: true,sameSite: 'none', secure: true});
              return res.json(tokens);
            });
        } catch (error) {
            res.status(401).json({error: error.message});
        }
    },

    deleteToken : async(req, res) => {
        try {
          res.clearCookie('refresh_token');
          return res.status(200).json({message:'Refresh token deleted.'});
        } catch (error) {
          res.status(401).json({error: error.message});
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
const express = require('express')
const path = require('path')
const req = require('express/lib/request')
require('dotenv').config()
const pool = require('./db')
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json());

app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port: ${PORT}`)
})

app.post('/users', async (req, res) => {
    try {
       const { name } = req.body;
       const newUser = await pool.query('INSERT INTO users (name) VALUES($1)', [name]);
       res.json(newUser.rows[0]);
    }
    catch(err){
        console.error(err.message);
    }
});

app.get('/allUsers', async (req, res) => {
    try {
        const allUsers = await pool.query('SELECT * FROM users');
        res.json(allUsers.rows);
    }
    catch (err) {
        console.error(err.message);
    }
});

app.get('/users/:id', async(req, res) => {
     try {
        const { id } = req.params;
        const userId = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        res.json(userId.rows[0])
    }
    catch (err) {
        console.error(err.message);
    }
});

app.put('/users/:id', async(req, res) => {
     try {
        const { id } = req.params;
        const { name } = req.body;
        const updateUser = await pool.query('UPDATE users  SET name = $1 WHERE id = $2', [name, id]);
        res.json('Users was updated')
    }
    catch (err) {
        console.error(err.message);
    }
});

app.delete('/users/:id', async(req, res) => {
     try {
        const { id } = req.params;
        const deleteUser = await pool.query('DELETE FROM users  WHERE id = $1', [id]);
        res.json('Users was deleted !')
    }
    catch (err) {
        console.error(err.message);
    }
});
const express = require('express')
require('dotenv').config()
const userRoutes = require('./routes/user.routes')
const formerRoutes = require('./routes/former.routes')
const commentRoutes = require('./routes/comment.routes')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json());

app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port: ${PORT}`)
})

app.use('/api/user',userRoutes);
app.use('/api/former',formerRoutes);
app.use('/api/comment',commentRoutes);
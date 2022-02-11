const express = require('express')
require('dotenv').config()
var cors = require('cors')
const userRoutes = require('./routes/user.routes')
const formerRoutes = require('./routes/former.routes')
const formationsRoutes = require('./routes/formations.routes')
const commentRoutes = require('./routes/comment.routes')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json());
app.use(cors({
    credentials:true,
    origin: '*'
}))
app.use(cookieParser())
app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port: ${PORT}`)
})

app.use('/user',userRoutes);
app.use('/former',formerRoutes);
app.use('/formations',formationsRoutes);
app.use('/comment',commentRoutes);
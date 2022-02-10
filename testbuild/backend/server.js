const express = require('express')
require('dotenv').config()
var cors = require('cors')
const userRoutes = require('./routes/user.routes')
const formerRoutes = require('./routes/former.routes')
const formationsRoutes = require('./routes/formations.routes')
const commentRoutes = require('./routes/comment.routes')
const helmet = require("helmet");
const PORT = process.env.PORT || 5000
const app = express()

//X-XSS-Protection
app.use(helmet.xssFilter());

//Referrer-Policy
app.use(
  helmet.referrerPolicy({
    policy: ["strict-origin-when-cross-origin"]
  })
 );

//X-Powered-By
app.use(helmet.hidePoweredBy());

//X-Content-Type-Options
app.use(helmet.noSniff());

//X-Frame-Options
 app.use(
  helmet.frameguard({
    action: "sameorigin",
  })
 );
//Strict-Transport-Security
app.use(
  helmet.hsts({
    maxAge: 63072000, //2ans
    includeSubDomains: true,
    preload: false
  })
);

app.use(express.json());


app.use(express.static(__dirname + '/build/'));

console.log(__dirname)

app.get('*', (req, res) => {
    return res.sendFile(path
      .join(__dirname + '/build/', 'index.html'))
  });

app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port: ${PORT}`)
})

app.use('/api/user',userRoutes);
app.use('/api/former',formerRoutes);
app.use('/api/formations',formationsRoutes);
app.use('/api/comment',commentRoutes);
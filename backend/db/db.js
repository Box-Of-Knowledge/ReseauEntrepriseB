const Pool = require('pg').Pool;

const pool = new Pool({
    host: "db",
    user: 'postgres',
    password: 'Mangaka1998', //changer selon le mdp choisi avec l'installation LOCALE de postgreSQL
    database: 'box',
    port: 5432,
});

module.exports = pool;
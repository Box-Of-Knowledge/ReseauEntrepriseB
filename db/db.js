const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'admin', //changer selon le mdp choisi avec l'installation LOCALE de postgreSQL
    database: 'box',
    port: 5432,
});

module.exports = pool;
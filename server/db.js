const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "24062406",
    host: "localhost",
    port: 5432,
    database: "myexample"
})

module.exports = pool;
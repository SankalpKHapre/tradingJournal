const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Sankalp@lm10',
    database: 'books'
})

module.exports = pool.promise()


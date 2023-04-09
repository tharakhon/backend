const mysql = require("mysql2");


const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: '3307',
    database: 'testweb'
});

conn.connect((error) => {
    if (error) throw error;
    console.log("connected !")
});

module.exports = conn;
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  database: "ecomerce_orquideas",
  user: "root",
  password: "1234567890",
});

module.exports = connection;
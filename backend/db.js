const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: process.env.password,
  port: 5432,
  database: "todo_app",
});

module.exports = pool;

const { createPool } = require('mysql')

const pool = createPool({
  host: process.env.HOST,
  port: process.env.PORTDB,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  connectionLimit: 10,
})

module.exports = pool

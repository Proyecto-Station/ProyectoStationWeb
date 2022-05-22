const { createPool } = require('mysql')

const pool = createPool({
  host: process.env.HOST,
  port: process.env.DBPORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  connectionLimit: 10
})

module.exports = pool
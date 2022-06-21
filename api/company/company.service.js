const pool = require('../../config/database')

module.exports = {
  getCompany: (callback) => {
    pool.query(
      'SELECT * FROM company', [], (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results)
      }
    )
  },
  getCompanyByCompanyId: (id, callback) => {
    pool.query(
      'SELECT * FROM company WHERE company.id = ?', [id], (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results[0])
      }
    )
  },
  create: (data, callback) => {
    pool.query(
      'INSERT INTO company (account_id, name, rut, email, phone, address) VALUES (?, ?, ?, ?, ?, ?)', [
        data.account_id,
        data.name,
        data.rut,
        data.email,
        data.phone,
        data.address
      ], (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results)
      }
    )
  },
  update: (data, callback) => {
    pool.query(
      'UPDATE company SET account_id = ?, name = ?, rut = ?, email = ?, phone = ?, address = ? WHERE id = ?', [
        data.account_id,
        data.name,
        data.rut,
        data.email,
        data.phone,
        data.address,
        data.id
      ], (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results[0])
      }
    )
  },
  deleted: (data, callback) => {
    pool.query(
      'DELETE FROM company WHERE id = ?', [data.id], (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results[0])
      }
    )
  }
}
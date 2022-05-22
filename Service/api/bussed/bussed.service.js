const pool = require('../../config/database')

module.exports = {
  getBussed: (callback) => {
    pool.query(
      'SELECT * FROM bussed', [], (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results)
      }
    )
  },
  getBussedByBussedId: (id, callback) => {
    pool.query(
      'SELECT * FROM bussed WHERE bussed.id = ?', [id], (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results[0])
      }
    )
  },
  create: (data, callback) => {
    pool.query(
      'INSERT INTO company (plate, model, passenger, company_id, security) VALUES (?, ?, ?, ?, ?)', [
        data.plate,
        data.model,
        data.passenger,
        data.company_id,
        data.security
      ], (err, results, fileds) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results)
      }
    )
  },
  update: (data, callback) => {
    pool.query(
      'UPDATE company SET plate = ?, model = ?, passenger = ?, company_id = ?, security = ? WHERE id = ?', [
        data.plate,
        data.model,
        data.passenger,
        data.company_id,
        data.security,
        data.id
      ], (err, results, fileds) => {
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
const pool = require('../../config/database')

module.exports = {
  getOperator: (callback) => {
    pool.query(
      'SELECT * FROM operator', [], (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results)
      }
    )
  },
  getOperatorByOpereratorId: (id, callback) => {
    pool.query(
      'SELECT * FROM operator WHERE id = ?', [id], (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results[0])
      }
    )
  },
  create: (data, callback) => {
    pool.query(
      'INSERT INTO operator (bus_id, driver_id, codriver_id) VALUES (?, ?, ?)', [
        data.bus_id,
        data.driver_id,
        data.codriver_id
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
      'UPDATE operator SET bus_id = ?, driver_id = ?, codriver_id = ? WHERE id = ?', [
        data.bus_id,
        data.driver_id,
        data.codriver_id,
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
      'DELETE FROM operator WHERE id = ?', [data.id], (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results[0])
      }
    )
  }
}

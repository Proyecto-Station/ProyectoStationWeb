const pool = require('../../config/database')

module.exports = {
  getDriver: (callback) => {
    pool.query(
      'SELECT * FROM driver', [], (err, results, fileds) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results)
      }
    )
  },
  getDriverByDriverId: (id, callback) => {
    pool.query(
      'SELECT * FROM driver WHERE id = ?', [id], (err, results, fileds) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results[0])
      }
    )
  },
  create: (data, callback) => {
    pool.query(
      'INSERT INTO driver (name, last_name, run, email, phone) VALUES (?, ?, ?, ?, ?)', [
        data.name,
        data.last_name,
        data.run,
        data.email,
        data.phone
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
      'UPDATE driver SET name = ?, last_name = ?, run = ?, email = ?, phone = ? WHERE id = ?', [
        data.name,
        data.last_name,
        data.run,
        data.email,
        data.phone,
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
      'DELETE FROM driver WHERE id = ?', [data.id], (err, results, fileds) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results[0])
      }
    )
  }
}
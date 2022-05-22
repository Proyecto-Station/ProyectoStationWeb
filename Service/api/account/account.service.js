const pool = require('../../config/database')

module.exports = {
  getAccount: (callback) => {
    pool.query(
      'SELECT * FROM account', [], (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results)
      }
    )
  },
  getAccountByAccountID: (id, callback) => {
    pool.query(
      'SELECT * FROM account WHERE account.id = ?', [id], (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results[0])
      }
    )
  },
  create: (data, callback) => {
    pool.query(
      'INSERT INTO account (account_id, name, last_name, run, phone) VALUES (?, ?, ?, ?, ?)', [
        data.account_id,
        data.name,
        data.last_name,
        data.run,
        data.phone
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
      'UPDATE account SET account_id = ?, name = ?, last_name = ?, run = ?, phone = ? WHERE id = ?', [
        data.account_id,
        data.name,
        data.last_name,
        data.run,
        data.phone,
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
      'DELETE FROM account WHERE id = ?', [data.id], (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results[0])
      }
    )
  }
}
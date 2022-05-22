const pool = require('../../config/database')

module.exports = {
  getUsers: (callBack) => {
    pool.query(
      'SELECT * FROM user', [], (err, results, fields) => {
        if (err) {
          return callBack(err)
        }

        return callBack(null, results)
      }
    )
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      'SELECT * FROM user WHERE id = ?', [id], (err, results, fields) => {
        if (err) {
          return callBack(err)
        }

        return callBack(null, results[0])
      }
    )
  },
  getUserByUserUsername: (username, callBack) => {
    pool.query(
      'SELECT * FROM user WHERE username = ?', [username], (err, results, fields) => {
        if (err) {
          return callBack(err)
        }

        return callBack(null, results[0])
      }
    )
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      'SELECT * FROM user WHERE email = ?', [email], (err, results, fields) => {
        if (err) {
          return callBack(err)
        }

        return callBack(null, results[0])
      }
    )
  },
  create: (data, callBack) => {
    pool.query(
      'INSERT INTO user (username, email, password, permission, is_active) VALUES (?, ?, ?, ?, ?)', [
        data.username,
        data.email,
        data.password,
        data.permission,
        data.is_active
      ], (err, results, fields) => {
        if (err) {
          return callBack(err)
        }

        return callBack(null, results)
      }
    )
  },
  update: (data, callBack) => {
    pool.query(
      'UPDATE user SET username = ?, email = ?, password = ?, permission = ?, is_active = ? WHERE id = ?', [
        data.username,
        data.email,
        data.password,
        data.permission,
        data.is_active,
        data.id
      ], (err, results, fields) => {
        if (err) {
          return callBack(err)
        }

        return callBack(null, results[0])
      }
    )
  },
  deleted: (data, callBack) => {
    pool.query(
      'DELETE FROM user WHERE id = ?', [data.id], (err, results, fields) => {
        if (err) {
          return callBack(err)
        }

        return callBack(null, results[0])
      }
    )
  }
}
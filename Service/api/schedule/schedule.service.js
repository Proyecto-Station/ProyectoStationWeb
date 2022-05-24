const pool = require('../../config/database')

module.exports = {
  getSchedule: (callback) => {
    pool.query(
      'SELECT * FROM schedule', [], (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results)
      }
    )
  },
  getScheduleByScheduleId: (id, callback) => {
    pool.query(
      'SELECT * FROM schedule WHERE id = ?', [id], (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return (null, results[0])
      }
    )
  },
  create: (data, callback) => {
    pool.query(
      'INSERT INTO schedule (check_in, check_out, date, route_id, platform, cost) VALUES (?, ?, ?, ?, ?, ?)', [
        data.check_in,
        data.check_out,
        data.date,
        data.route_id,
        data.platform,
        data.cost
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
      'UPDATE schedule SET check_in = ?, check_out = ?, date = ?, route_id = ?, platform = ?, cost = ? WHERE id = ?', [
        data.check_in,
        data.check_out,
        data.date,
        data.route_id,
        data.platform,
        data.cost,
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
      'DELETE FROM schedule WHERE id = ?', [data.id], (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results[0])
      }
    )
  }
}